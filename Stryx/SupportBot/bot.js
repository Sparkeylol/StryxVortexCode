const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const { Logger } = require('tslog');

class Client extends AkairoClient {
    constructor() {
        super({
            ownerID: ['473903419497775114', '401792058970603539']
        }, {
            // Options for discord.js goes here.
        });

        this.commandHandler = new CommandHandler(this, {
            directory: './commands/',
            prefix: (process.env.NODE_ENV === 'production' ? '.' : '!'),
            defaultCooldown: 10000,
            allowMention: true,
            blockBots: true,
            blockClient: true,
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './listeners/'
        })

        this.inhibitorHandler = new InhibitorHandler(this, {
          directory: './inhibitors/'
        })

        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

        this.commandHandler.loadAll()

        this.listenerHandler.setEmitters({
          commandHandler: this.commandHandler,
          inhibitorHandler: this.inhibitorHandler,
          listenerHandler: this.listenerHandler
        })

        this.listenerHandler.loadAll()

        this.inhibitorHandler.loadAll()

        this.log = new Logger();
    }
}

const client = new Client();
client.login(process.env.BOT_TOKEN);
