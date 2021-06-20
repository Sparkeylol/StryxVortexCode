import { blacklist, PrismaClient } from '@prisma/client';
import * as csv from 'csv/lib/sync';
import { readFile } from 'fs';

const prisma = new PrismaClient()


readFile('./blacklist.csv', 'utf8', async (err, data) => {
    const blacklistData = csv.parse(data, {
        bom: true,
        cast: false,
        columns: true
    }) as Array<blacklist>

    await prisma.blacklist.createMany({
        data: blacklistData
    })
    console.log('Done!')
    process.exit(0)
})