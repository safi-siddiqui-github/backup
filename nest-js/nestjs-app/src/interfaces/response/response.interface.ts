import { $ZodIssue } from 'zod/v4/core';
import { ResponseBody } from './response-body.interface';

export interface ResponseInterface {
  success: boolean;
  message?: string;
  data?: ResponseBody;
  error?: $ZodIssue[];
}
