'use server';

import mongoose from 'mongoose';
import { env } from 'process';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log('Connected');
    return;
  }
  try {
    const res = await mongoose.connect(env.MONGODB_DATABASE_URL);
    connection.isConnected = res.connections[0].readyState;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connect;
