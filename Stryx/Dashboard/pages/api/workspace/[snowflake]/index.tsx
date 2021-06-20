import { NextApiRequest, NextApiResponse } from 'next';
import FlakeId from 'flake-idgen';
import intformat from 'biguint-format';
import jwt from 'next-auth/jwt';
import stripe from '../../../../lib/stripe';
import prisma from '../../../../lib/prisma';
import { JWTSession } from '../../auth/[...nextauth]';

const workspace = async (req: NextApiRequest, res: NextApiResponse) => {
  const data = JSON.parse(req.body);

  const user = await jwt.getToken({
    req,
    secret: process.env.JWT_SECRET,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    signingKey: process.env.JWT_SIGNING_KEY,
  }) as JWTSession;

  if (!user) {
    return res.status(401).send('You are not signed in.');
  }

  const blacklisted = await prisma.blacklist.findFirst({
    where: {
      userId: user.user.id,
    },
  });

  if (blacklisted) {
    return res.status(403).send('Blacklisted.');
  }

  if (req.method === 'POST') {
    const ws = await prisma.workspace.update({
      where: {
        workspaceId: req.query.snowflake as string,
      },
      data,
    });

    return res.status(200).json({
      ws,
    });
  }
};

export default workspace;
