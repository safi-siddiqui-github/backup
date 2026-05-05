import crypto from "crypto";
import { envLib } from "./lib-env";

const ALGO = "aes-256-gcm";
const SECRET = envLib.CRYPTO_SECRET_KEY; // 32 bytes key

export type EncryptObjectType = {
  randomFieldOne?: string;
  randomFieldTwo?: string;
  randomFieldThree?: Date;
};

export function CryptoEncryptObject(obj: EncryptObjectType): string {
  const plaintext = JSON.stringify(obj);
  const iv = crypto.randomBytes(12); // recommended for GCM
  if (!SECRET) {
    throw new Error("CRYPTO_SECRET_KEY is required in evs");
  }
  const cipher = crypto.createCipheriv(ALGO, Buffer.from(SECRET), iv);

  let encrypted = cipher.update(plaintext, "utf8", "base64");
  encrypted += cipher.final("base64");
  const tag = cipher.getAuthTag().toString("base64");

  return Buffer.from(
    JSON.stringify({
      iv: iv.toString("base64"),
      data: encrypted,
      tag,
    }),
  ).toString("base64");
}

export function CrpytoDecryptObject(token: string): EncryptObjectType {
  const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf8"));

  const iv = Buffer.from(decoded.iv, "base64");
  const tag = Buffer.from(decoded.tag, "base64");

  if (!SECRET) {
    throw new Error("CRYPTO_SECRET_KEY is required in evs");
  }
  const decipher = crypto.createDecipheriv(ALGO, Buffer.from(SECRET), iv);
  decipher.setAuthTag(tag);

  let decrypted = decipher.update(decoded.data, "base64", "utf8");
  decrypted += decipher.final("utf8");

  return JSON.parse(decrypted);
}

export function LibCryptoShortId(len = 6) {
  return crypto.randomBytes(len).toString("base64url").slice(0, len);
}
