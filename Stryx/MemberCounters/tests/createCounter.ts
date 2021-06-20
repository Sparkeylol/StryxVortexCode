import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

prisma.memberCounters.create({
    data: {
        ownerId: '401792058970603539',
        isEmbed: false,
        template: {
            content: ':tada: Woohoo! Our current member count is **{current}**. Only **{remaining}** to go until we reach **{goal}**!'
        },
        goal: 100,
        current: 0,
        groupId: '9350842',
        webhookUrl: '',
        increment: 10
    }
}).then((counter) => console.log(counter)).catch((e) => console.error(e))