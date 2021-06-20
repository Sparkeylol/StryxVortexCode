/* eslint-disable no-param-reassign */
import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { GenericObject } from 'next-auth/_utils';

export interface JWTSession {
  name: string,
  email: null,
  picture: string,
  account: GenericObject,
  user: GenericObject,
}

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => NextAuth(req, res, {
  providers: [
    Providers.Discord({
      clientId: '806645291607785493',
      clientSecret: 'yJX8AV-3DLm1GU1dH_ULIgknJ3umWz4t',
      scope: 'identify guilds',
    }),
  ],
  // database: 'postgres://stryx_dev:W9D9Ezrnz9mtXe5bx49HtnTnvzUPq4wg@51.222.84.224/stryx_dev',
  jwt: {
    signingKey: process.env.JWT_SIGNING_KEY,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  callbacks: {
    jwt: async (token, user, account, profile) => {
      if (account) {
        token.user = profile;
        token.account = account;
      }

      return Promise.resolve(token);
    },
  },
});
