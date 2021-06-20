import { Listener } from 'discord-akairo';
import { ActivityType } from 'discord.js';
import log from '../src/logger';
import StryxClient from '../src/client';

async function changeStatus(client: StryxClient) {
  const status = client.guild?.settings.statuses[Math.floor(
    Math.random() * client.guild?.settings.statuses.length,
  )];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  await client.user?.setActivity(status!.text, { type: status!.type as ActivityType });
}

class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {
    log.info(`[${this.client.user?.id}] ✔️   Stryx Bot Online!`);
    const { guild } = this.client as StryxClient;
    if (!guild?.settings.statuses || guild?.settings.statuses.length <= 0) {
      this.client.user?.setActivity('Powered By Stryx.cloud', { type: 'PLAYING' });
      return;
    }
    if (guild?.settings.statuses.length > 0) {
      if (guild?.branding) {
        guild?.settings.statuses.push({ type: 'PLAYING', text: 'Powered By Stryx.cloud' });
      }
      changeStatus(this.client as StryxClient);
      setInterval(() => changeStatus(this.client as StryxClient), 120000);
    }
  }
}

module.exports = ReadyListener;
