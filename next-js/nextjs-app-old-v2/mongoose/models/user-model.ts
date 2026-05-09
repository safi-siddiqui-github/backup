import mongoose, { Document, Schema } from 'mongoose';

export type UserModelTypeMongoose = Document & {
  name: string;
  username: string;
  email: string;
  password: string;
  lastLogin: Date;
  isVerified: boolean;
  resetPasswordToken?: string;
  resetPasswordTokenExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
};

const modelSchema: Schema<UserModelTypeMongoose> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
  },
  { timestamps: true },
);

const UserModelMongoose =
  mongoose.models.User || mongoose.model('User', modelSchema);
export default UserModelMongoose;
