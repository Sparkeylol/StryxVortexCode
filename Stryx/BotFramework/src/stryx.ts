import fastify from 'fastify';
import log from './logger';
import prisma from './database';
import StryxClient from './client';
import { Guild } from './domain';

const bots: StryxClient[] = [];

prisma.guilds.findMany({
  where: {
    region: process.env.REGION,
  },
}).then(async (guilds) => {
  if (!guilds || guilds.length === 0) {
    log.info('No guilds found! Shutting down.');
    process.exit(0);
  }

  log.info('Logging into bots...');

  guilds.forEach(async (guild) => {
    log.info(`[${guild.id}] Initializing...`);

    const client = new StryxClient(guild as unknown as Guild);
    log.info(`[${guild.id}] Logging in...`);
    await client.login(guild.botToken);
    log.info(`[${guild.id}] Logged in!`);
    bots.push(client);
  });
}).catch((err) => {
  log.error(err);
});

const app = fastify({ logger: true });

app.get('/', async () => ({
  hello: 'world',
}));

app.get('/bots', async (request, reply) => {
  reply.code(200);

  return {
    bots: bots.map((val) => val.user?.id),
  };
});

app.post('/bots', async (request, reply) => {
  const body = request.body as StryxClient[];

  body.forEach(async (bot) => {
    const guild = await prisma.guilds.findFirst({
      where: {
        guildId: bot.user?.id,
      },
    });

    if (!guild) {
      reply.code(404).send({
        error: true,
        message: 'Bot not found.',
      });
    }

    log.info(`[${guild?.id}] Initializing...`);

    const client = new StryxClient(guild as unknown as Guild);

    await client.login(guild?.botToken);
  });
});

(async () => {
  try {
    await app.listen(8081);
  } catch (err) {
    log.fatal(err);
    process.exit(1);
  }
})();

// api.post('/bots', (req, res) => {
//   const bots = req.body

//   bots.forEach(async (bot) => {
//     log.info(`[${guild.id}] Initializing...`)

//     const client = new StryxClient();
//     log.info(`[${guild.id}] Logging in...`)
//     await client.login(guild.botToken);
//     log.info(`[${guild.id}] Logged in!`)
//     bots.push({ id: client.user.id, client: client })
//   })
//   return res.status(200).json({
//     error: false,
//     message: "Success!"
//   })
// })

// api.listen(8081, () => {
//   log.info('API Server Online!')
// })
