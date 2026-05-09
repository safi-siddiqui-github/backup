import { ErrorOption } from 'react-hook-form';
import { CategoryType, UserType } from './modelTypes';

export type AxiosResponseType = {
  success?: boolean;
  message?: string;
  data?: Data;
  errors?: Errors;
};

export type ResponseResultType = {
  old?: Old;
} & AxiosResponseType;

type Errors = {
  id?: string;
  email?: string;
  password?: string;
  name?: string;
  description?: string;
  image?: string;
  // id?: string[];
  // email?: string[];
  // email?: ErrorOption;
  // password?: string[];
  // name?: string[];
  // description?: string[];
  // image?: string[];
};

type Old = {
  email?: string;
  password?: string;
  name?: string;
  description?: string;
};

type Data = {
  token?: string;
  user?: UserType;
  category?: CategoryType;
  categories?: CategoryType[];
};

