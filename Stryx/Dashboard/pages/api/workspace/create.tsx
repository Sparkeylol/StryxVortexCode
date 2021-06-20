import { NextApiRequest, NextApiResponse } from 'next';
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import jwt from 'next-auth/jwt';
import stripe from '../../../lib/stripe';
import prisma from '../../../lib/prisma';
import { JWTSession } from '../auth/[...nextauth]';

const createWorkspace = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(data.session);

  const user = await jwt.getToken({
    req,
    secret: process.env.JWT_SECRET,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    signingKey: process.env.JWT_SIGNING_KEY,
  }) as JWTSession;

  if (!user) {
    return res.status(401).send('You are not signed in.');
  }

  if (!checkoutSession) {
    return res.status(500).send('Invalid Checkout Session.');
  }

  const blacklisted = await prisma.blacklist.findFirst({
    where: {
      userId: user.user.id,
    },
  });

  if (blacklisted) {
    return res.status(403).send('Blacklisted.');
  }

  const customerData = await prisma.customer_data.findFirst({
    where: {
      stripe_customer_id: checkoutSession.customer as string,
    },
  });

  if ((await customerData).user_id !== user.user.id) {
    return res.status(401).send('Discord ID Mismatch.');
  }

  const flake = new FlakeId({ epoch: 1609459200 });

  const workspaceId = intformat(flake.next(), 'dec');

  const workspace = await prisma.workspace.create({
    data: {
      workspaceId,
      workspaceName: data.name,
      members: [user.user.id],
    },
  });

  const subscription = await stripe.subscriptions.retrieve(checkoutSession.subscription as string)

  return res.status(200).json({
    workspace,
    subscription,
  });
};

export default createWorkspace;
