/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'next-auth/jwt';

import { PrismaClient } from '@prisma/client';
import { JWTSession } from '../../auth/[...nextauth]';
import prisma from '../../../../lib/prisma';

const db = new PrismaClient();

async function getServers(account) {
  const result = fetch('https://discord.com/api/v8/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${account.accessToken}`,
    },
  });

  return (await result).json();
}

// eslint-disable-next-line consistent-return
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const guildId = req.query.serverid as string;

  const token = await jwt.getToken({
    req,
    secret: process.env.JWT_SECRET,
    encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    signingKey: process.env.JWT_SIGNING_KEY,
  }) as JWTSession;

  const blacklisted = await prisma.blacklist.findFirst({
    where: {
      userId: token.user.id,
    },
  });

  if (blacklisted) {
    return res.status(403).send('Blacklisted.');
  }

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  const servers = await getServers(token.account);
  if (servers.retry_after) {
    delay(servers.retry_after * 1000);
    return res.status(500).send(servers);
  }
  const checkGuild = servers.find((server) => server.id === guildId);
  if ((checkGuild.permissions & 0x8) !== 0x8) {
    return res.send({
      error: true,
      message: 'Insufficient Permissions.',
    });
  }

  if (!token || token === null) {
    return res.send({
      error: true,
      message: 'Not Authenticated.',
    });
  }

  switch (req.method) {
    case 'GET': {
      res.send(await db.guilds.findUnique({
        where: {
          guildId,
        },
      }));
      break;
    }

    case 'POST': {
      const guildSettings = JSON.parse(req.body);
      const workspace = await db.workspace.findFirst({
        where: {
          members: {
            has: token.user.id,
          },
        },
      });
      const guildExists = await db.guilds.findFirst({
        where: {
          botOwner: workspace.workspaceId,
        },
      });

      if (guildExists) {
        if (guildSettings.botOwner !== workspace.workspaceId) {
          return res.status(401).json({
            error: true,
            message: 'You cannot edit this guild.',
          });
        }
      }
      try {
        const guild = await db.guilds.upsert({
          where: {
            guildId,
          },
          update: guildSettings,
          create: {
            guildId,
            ...guildSettings,
            branding: true,
          },
        });
        res.send(guild);
        db.logs.create({
          data: {
            guildId,
            userId: token.user.id,
            text: 'Updated Settings',
            date: new Date(),
          },
        });
        if (guild.guildId === guildId) {
          // do nothing, if token updated, restart container
          // see https://docs.docker.com/engine/api/v1.24/#31-containers
        } else {
          // create the container
        }
      } catch (err) {
        res.status(500).send({
          error: true,
          message: JSON.stringify(err),
        });
      }
      break;
    }

    case 'DELETE': {
      const guild = await db.guilds.delete({
        where: {
          guildId,
        },
      });
      res.send(guild);
      break;
    }

    default: {
      res.send({
        error: true,
        message: `Only GET/POST/DELETE to /api/servers/${guildId}/`,
      });
      break;
    }
  }
};
