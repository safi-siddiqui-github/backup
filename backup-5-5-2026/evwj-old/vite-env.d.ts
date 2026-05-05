declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL?: string;
    SESSION_SECRET?: string;
    USER_SESSION_NAME?: string;
    ADMIN_SESSION_NAME?: string;
    S3_BUCKETNAME?: string;
    S3_BUCKETREGION?: string;
    S3_ACCESS_KEY_ID?: string;
    S3_SECRET_ACCESS_KEY?: string;
    GOOGLE_OATH_CLIENT_ID?: stirng;
    GOOGLE_OATH_CLIENT_SECRET?: stirng;
    GOOGLE_OATH_CLIENT_REDIRECT?: stirng;
    NEXT_PUBLIC_FRONTEND_URL?: stirng;

    DATABASE_URL?: string;
    API_URL?: string;
  }
}
