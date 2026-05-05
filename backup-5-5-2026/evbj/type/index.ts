import { OTP, Session, User } from "@/prisma/generated/client";
import { NextResponse } from "next/server";
import { $ZodIssue } from "zod/v4/core";

// export type ParamType = {
//   eventModel?: Partial<EventModel> & { include?: Prisma.EventModelInclude };
//   guestGroup?: Partial<GuestGroup> & { include?: Prisma.GuestGroupInclude };
// };

type OrNull<T> = Partial<T> | null;

type SessionModel = Partial<Session> & {
  user?: OrNull<User>;
};

type UserModel = Partial<User> & {
  sessions?: Partial<Session>[];
};

type OTPModel = Partial<OTP> & {
  user?: OrNull<User>;
};

export type ResponseDataType = {
  user?: UserModel | null;
  session?: SessionModel | null;
  otp?: OTPModel | null;
};

export type ResponseBody = {
  success: boolean;
  message?: string;
  data?: ResponseDataType;
  error?: {
    type: "zod" | "prisma" | "unknown";
    message: string;
    details?: $ZodIssue[];
  };
};

export type ResponseType = NextResponse<ResponseBody>;

export type EnvHelperType = {
  SESSION_SECRET?: string;
  DATABASE_URL?: string;
  HASH_SALT_ROUND?: string;
  USER_SESSION_NAME?: string;
  ADMIN_SESSION_NAME?: string;
  S3_ACCESS_KEY_ID?: string;
  S3_SECRET_ACCESS_KEY?: string;
  S3_BUCKETREGION?: string;
  S3_BUCKETNAME?: string;
  AWS_ACCESS_KEY_ID?: string;
  AWS_SECRET_ACCESS_KEY?: string;
  AWS_REGION?: string;
  AWS_S3_BUCKET_NAME?: string;
  AWS_S3_BUCKET_URL?: string;
};

export type EnvHelperReturnType = {
  databaseUrl?: string;
  hashSaltRound?: string;
  sessionKey?: string;
  userSessionName?: string;
  adminSessionName?: string;
  s3AccessKeyId?: string;
  s3SecretAccessKey?: string;
  s3BucketRegion?: string;
  s3BucketName?: string;
  awsAccessKeyId?: string;
  awsSecretAccessKey?: string;
  awsRegion?: string;
  awsS3BucketName?: string;
  awsS3BucketUrl?: string;
};

export type EncryptionObjectType = {
  sessionId?: OrNull<number>;
  expiresAt?: OrNull<Date>;
  isUser?: OrNull<boolean>;
  isAdmin?: OrNull<boolean>;
};
