const { Listener } = require('discord-akairo');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {
        this.client.log.info(`[${this.client.user.id}] ✔️   Stryx Bot Online!`)
        const statuses = [
          {
            type: 'WATCHING',
            text: `For ${(process.env.NODE_ENV === 'production' ? '.' : '!')}help`
          }
        ]
        async function changeStatus(client) {
          let status = statuses[Math.floor(Math.random() * statuses.length)]
          await client.user.setActivity(status.text, { type: status.type })
        }
        changeStatus(this.client)
        setInterval(() => changeStatus(this.client), 120000)
    }
}

module.exports = ReadyListener;
