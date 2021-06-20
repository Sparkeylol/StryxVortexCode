/* eslint-disable consistent-return */
import jwt from 'next-auth/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import stripe from '../../../lib/stripe';
import prisma from '../../../lib/prisma';
import { JWTSession } from '../auth/[...nextauth]';

async function findOrCreateUser(user: JWTSession) {
  let customer = await prisma.customer_data.findFirst({
    where: {
      user_id: user.user.id,
    },
  });

  if (!customer) {
    const stripeCustomer = await stripe.customers.create({
      metadata: {
        discordId: user.user.id,
      },
    });
    customer = await prisma.customer_data.create({
      data: {
        user_id: user.user.id,
        stripe_customer_id: stripeCustomer.id,
      },
    });

    return stripeCustomer.id;
  }

  return customer.stripe_customer_id;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const createCheckoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = JSON.parse(req.body);
      const user = await jwt.getToken({
        req,
        secret: process.env.JWT_SECRET,
        encryptionKey: process.env.JWT_ENCRYPTION_KEY,
        signingKey: process.env.JWT_SIGNING_KEY,
      }) as JWTSession;

      const blacklisted = await prisma.blacklist.findFirst({
        where: {
          userId: user.user.id,
        },
      });

      if (blacklisted) {
        return res.status(403).send('Blacklisted.');
      }

      const customer = await findOrCreateUser(user);

      const plans = {
        1: (process.env.NODE_ENV === 'production' ? '' : 'price_1ISomhIeZ5j41j3q5oByuVTv'),
        6: (process.env.NODE_ENV === 'production' ? '' : 'price_1ISomhIeZ5j41j3q5oByuVTv'),
        12: (process.env.NODE_ENV === 'production' ? '' : 'price_1ISomhIeZ5j41j3q5oByuVTv'),
      };

      const plan = plans[data.plan];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer,
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata: {
            discordId: user.user.id,
          },
          items: [
            {
              plan,
            },
          ],
        },
        success_url: `${(process.env.NODE_ENV === 'production' ? 'https://' : 'http://')}${req.headers.host}/workspace/create?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${(process.env.NODE_ENV === 'production' ? 'https://' : 'http://')}${req.headers.host}/workspace/create`,
      });
      return res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res
        .status(500)
        .json({ error: { statusCode: 500, message: err.message } });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default createCheckoutSession;
