// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    // NEXT_PUBLIC_API_URL: string;
    // NEXT_PUBLIC_APP_ENV: 'development' | 'production' | 'staging';
    // DATABASE_URL: string;
    // STRIPE_SECRET_KEY: string;
    NEXT_PUBLIC_AXIOS_BASE_URL: string;
  }
}
