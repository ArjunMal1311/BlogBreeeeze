import { PrismaClient } from '@prisma/client'

const client = new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = client;
module.exports = client;
