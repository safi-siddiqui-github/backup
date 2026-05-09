export type SpecialGuest = {
  id: string;
  name: string;
  title: string;
  bio: string;
  photo?: string;
  credentials: string[];
  socialLinks: SocialLinks;
  isImported: boolean;
  importSource?: ImportSourceType;
};

type ImportSourceType = "linkedin" | "twitter" | "manual";

export type SocialLinks = {
  linkedin?: string | undefined;
  twitter?: string | undefined;
  website?: string | undefined;
};

export type ProfileDataType = {
  name?: string;
  title?: string;
  headline?: string;
  bio?: string;
  summary?: string;
  photo?: string;
  socialLinks?: SocialLinks;
  source?: ImportSourceType;
  credentials?: string[];

  profilePicture?: string;
  experience?: { company?: string; position?: string; duration?: string }[];
  username?: string;
  followerCount?: number;

  recentPosts?: {
    id?: string;
    imageUrl?: string;
    caption?: string;
  }[];

  //   credentials: "linkedin" | "twitter" | "manual" | undefined;
};
