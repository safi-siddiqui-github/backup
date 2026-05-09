export type ApiResponse = {
  success: boolean;
  param?: 'email' | 'password' | 'username';
  error?: string;
  message?: string;
  data?: unknown;
};
