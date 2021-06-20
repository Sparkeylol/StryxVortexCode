import { Prisma, PrismaClient } from '@prisma/client';

import { Webhook, MessageBuilder } from 'discord-webhook-node';

import { Client } from 'bloxy';

import { Logger } from "tslog";

import * as format from 'string-template';

const prisma = new PrismaClient();

const bloxy = new Client();

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const log: Logger = new Logger();

interface EmbedCounter {
    content: string,
    color: string
}

interface MessageCounter {
    content: string
}

async function CheckGroups() {
    const counters = await prisma.memberCounters.findMany()
    counters.forEach(async (counter) => {
        const hook = new Webhook(counter.webhookUrl)
        let group = await bloxy.getGroup(parseInt(counter.groupId))
        log.info(`Group ${group.id} has ${group.memberCount} members, database has ${counter.current} members.`)
        await prisma.memberCounters.update({
            where: {
                id: counter.id,
            },
            data: {
                current: group.memberCount
            }
        })
        if (group.memberCount !== counter.current) {
            if (counter.isEmbed) {
                const embed = new MessageBuilder()
                const template = counter.template
                // @ts-ignore
                embed.setDescription(format.default(template.content, {
                    current: group.memberCount,
                    groupName: group.name,
                    goal: counter.goal,
                    remaining: counter.goal - group.memberCount
                }))
                // @ts-ignore
                embed.setColor(template.color)
                embed.setFooter("Powered By Stryx.cloud")
                embed.setTimestamp()
                hook.send(embed).catch(async (e) => {
                    log.error(e)
                    const errorHook = new Webhook('https://discord.com/api/webhooks/798257932939558982/7HTm-ykAUI22Y9PrdQV2KzW0ywHkMP96R8PS7vTSLlIRxo_j7gOJKvdiW8JuyPrCL5gM')
                    await errorHook.send(`**Webhook error detected**\nError: \`${e}\`\nCounter: \`\`\`${JSON.stringify(counter)}\`\`\`\n\nCounter has been deleted.`)

                    await prisma.memberCounters.delete({
                        where: {
                            id: counter.id
                        }
                    })
                })
            } else {
                const template = counter.template
                // @ts-ignore
                hook.send(format.default(template.content, {
                    current: group.memberCount,
                    groupName: group.name,
                    goal: counter.goal,
                    remaining: counter.goal - group.memberCount
                })).catch(async (e) => {
                    log.error(e)
                    const errorHook = new Webhook('https://discord.com/api/webhooks/798257932939558982/7HTm-ykAUI22Y9PrdQV2KzW0ywHkMP96R8PS7vTSLlIRxo_j7gOJKvdiW8JuyPrCL5gM')
                    await errorHook.send(`**Webhook error detected**\nError: \`${e}\`\nCounter: \`\`\`${JSON.stringify(counter)}\`\`\`\n\nCounter has been deleted.`)

                    await prisma.memberCounters.delete({
                        where: {
                            id: counter.id
                        }
                    })
                })
            }
        }
        if (group.memberCount >= counter.goal) {
            const updatedCounter = await prisma.memberCounters.update({
                where: {
                    id: counter.id,
                },
                data: {
                    goal: counter.goal + counter.increment
                },
            });
            if (counter.isEmbed) {
                const embed = new MessageBuilder()
                const template = counter.template
                // @ts-ignore
                embed.setDescription(format.default(`:tada: | We hit our goal! Our new goal is **{goal}**\n\n${template.content}`, {
                    current: group.memberCount,
                    groupName: group.name,
                    goal: updatedCounter.goal,
                    remaining: updatedCounter.goal - group.memberCount
                }))
                // @ts-ignore
                embed.setColor(template.color)
                embed.setFooter("Powered By Stryx.cloud")
                embed.setTimestamp()
                hook.send(embed).catch(async (e) => {
                    log.error(e)
                    const errorHook = new Webhook('https://discord.com/api/webhooks/798257932939558982/7HTm-ykAUI22Y9PrdQV2KzW0ywHkMP96R8PS7vTSLlIRxo_j7gOJKvdiW8JuyPrCL5gM')
                    await errorHook.send(`**Webhook error detected**\nError: \`${e}\`\nCounter: \`\`\`${JSON.stringify(counter)}\`\`\`\n\nCounter has been deleted.`)

                    await prisma.memberCounters.delete({
                        where: {
                            id: counter.id
                        }
                    })
                })
            } else {
                const template = counter.template
                // @ts-ignore
                hook.send(format.default(`:tada: | We hit our goal! Our new goal is **{goal}**\n\n${template.content}`, {
                    groupName: group.name,
                    current: group.memberCount,
                    goal: updatedCounter.goal,
                    remaining: updatedCounter.goal - group.memberCount
                })).catch(async e => {
                    console.log('error')
                    log.error(e)
                    const errorHook = new Webhook('https://discord.com/api/webhooks/798257932939558982/7HTm-ykAUI22Y9PrdQV2KzW0ywHkMP96R8PS7vTSLlIRxo_j7gOJKvdiW8JuyPrCL5gM')
                    await errorHook.send(`**Webhook error detected**\nError: \`${e}\`\nCounter: \`\`\`${JSON.stringify(counter)}\`\`\`\n\nCounter has been deleted.`)

                    await prisma.memberCounters.delete({
                        where: {
                            id: counter.id
                        }
                    })
                })
            }
        }
        await delay(5000)
    })
};

log.info('Member Counters running!')
CheckGroups().then(() => {
    setInterval(async () => await CheckGroups(), 10000)
})