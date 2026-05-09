import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const drizzleDB = drizzle(process.env.DRIZZLE_DATABASE_URL!);
