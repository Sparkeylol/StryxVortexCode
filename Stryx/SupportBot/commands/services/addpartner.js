const { Command } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');

const db = require('../../util/database');

const noblox = require('noblox.js')

class AddPartnerCommand extends Command {
    constructor() {
        super('addpartner', {
           aliases: ['addpartner'],
           description: {
             content: 'Create a new partner',
             usage: ''
           },
           ownerOnly: true,
           args: [
             {
               id: 'reps',
               type: 'string',
               prompt: {
                 start: 'Add representatives by id, split by spaces.'
               }
             },
             {
               id: 'robloxId',
               type: 'string',
               prompt: {
                 start: 'Whats the roblox group ID?'
               }
             },
             {
               id: 'discord',
               type: 'string',
               prompt: {
                 start: 'Discord invite link?'
               }
             }
           ],
           category: 'services',
           cooldown: 5000,
        });
    }

    async exec(msg, { reps, robloxId, discord }) {
      await db.partners.create({
        data: {
          reps: reps.split(' '),
          robloxId,
          discord
        }
      })

      msg.channel.send('Created partner, run `.pi` again.')
    }
}

module.exports = AddPartnerCommand;
