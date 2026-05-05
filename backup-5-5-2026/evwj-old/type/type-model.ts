import { FetchUserAttributesOutput } from "@aws-amplify/auth";

export type OrNull<T> = T | null;
export type OrNullPartial<T> = Partial<T> | null;

export type UserModelType = FetchUserAttributesOutput;

// export type UserModelType = {
//   id?: OrNull<number>;
//   email?: OrNull<string>;
//   username?: OrNull<string>;
//   firstname?: OrNull<string>;
//   lastname?: OrNull<string>;
//   password?: OrNull<string>;
//   countryCode?: OrNull<string>;
//   phone?: OrNull<string>;
//   agreedTerms?: OrNull<boolean>;
//   avatar?: OrNull<string>;
//   googleId?: OrNull<string>;
//   facebookId?: OrNull<string>;
//   linkedinId?: OrNull<string>;
//   appleId?: OrNull<string>;
//   emailVerified?: OrNull<boolean>;
//   createdAt?: OrNull<Date>;
//   updatedAt?: OrNull<Date>;
//   sessions?: SessionModelType[];
// };

export type SessionModelType = {
  id?: OrNull<number>;
  userId?: OrNull<number>;
  // expiresAt?: OrNull<Date>;
  expiresAt?: OrNull<number>;
  token?: OrNull<string>;
  createdAt?: OrNull<Date>;
  updatedAt?: OrNull<Date>;
  // user?: OrNull<UserModelType>;
  accessToken?: OrNull<string>;
};

export type OTPModelType = {
  id?: OrNull<number>;
  userId?: OrNull<number>;
  expiresAt?: OrNull<Date>;
  token?: OrNull<string>;
  createdAt?: OrNull<Date>;
  updatedAt?: OrNull<Date>;
  // user?: OrNull<UserModelType>;
};
