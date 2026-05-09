import path from 'node:path';
import type { PrismaConfig } from 'prisma';
import 'dotenv/config'

export default {
  earlyAccess: true,
  schema: path.join('object-relational-mappers', 'prisma', 'schema'),
} satisfies PrismaConfig;
