// This instantiates a Singleton, this at all times, creates one single client every time someone tries to access it
import { PrismaClient } from "@prisma/client"

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ log: ["query"], })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma