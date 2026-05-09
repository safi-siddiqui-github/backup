type Similar = {
  id?: string;
  deleted_at?: string;
  created_at?: string;
  updated_at?: string;
  modified_at?: string;
};

export type UserType = {
  email?: string;
  name?: string;
  username?: string;
} & Similar;

export type CategoryType = {
  name?: string;
  description?: string;
  image?: ImageType;
} & Similar;

export type ImageType = {
  category_id?: string;
  name?: string;
  size?: string;
  type?: string;
  path?: string;
  url?: string;
} & Similar;
