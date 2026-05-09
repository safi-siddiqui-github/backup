namespace NodeJS {
  interface ProcessEnv {
    PRISMA_DATABASE_URL: string;
    MONGODB_DATABASE_URL: string;
    BCRYPT_SALT_ROUNDS: string;
    RESEND_API_KEY: string;
    RESEND_EMAIL_FROM: string;
  }
}
