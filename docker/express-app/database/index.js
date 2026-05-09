import mongoose from "mongoose";

const databaseUrl = process.env.DATABASE_URL || "";
const databaseName = process.env.DATABASE_NAME || "";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${databaseUrl}/${databaseName}`
    );

    console.log(
      `Database connected. DB Host ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Database disconnected", error.message);
    process.exit(1);
  }
};
