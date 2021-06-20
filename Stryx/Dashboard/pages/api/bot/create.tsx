import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'next-auth/jwt';
import Portainer from '../../../lib/portainer';
import prisma from '../../../lib/prisma';
import { JWTSession } from '../auth/[...nextauth]';

const createBot = async (req: NextApiRequest, res: NextApiResponse) => {
  const portainer = new Portainer();

  const data = req.body;

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

  await portainer.callApiWithKey('post', '/api/endpoints/2/docker/images/create?fromImage=jackmerrill%2Fvhq-bot-base:latest', {
    fromImage: 'jackmerrill/vhq-bot-base:latest',
  });

  const container = await portainer.callApiWithKey('post', `/api/endpoints/2/docker/containers/create?name=${data.bot.guild}`, {
    Image: 'jackmerrill/vhq-bot-base:latest',
    Env: [
      `GUILD_ID=${data.bot.guild}`,
    ],
    Labels: {
      GuildId: data.bot.guild,
    },
    HostConfig: {
      RestartPolicy: {
        MaximumRetryCount: 0,
        Name: 'always',
      },
    },
    name: `${data.bot.guild}`,
  });
};
