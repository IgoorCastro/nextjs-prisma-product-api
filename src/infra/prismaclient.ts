// garantindo apenas uma instancia do prisma

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export { prisma };