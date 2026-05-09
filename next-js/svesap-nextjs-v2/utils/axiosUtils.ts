'use server';

import { getCookie } from '@/actions/authActions';
import { AxiosResponseType } from '@/types/responseTypes';
import axios, { AxiosError } from 'axios';

const axiosUtils = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
  withCredentials: true, // ✅ required for cookies/session
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    // Accept: 'multipart/form-data',
    'Content-Type': 'multipart/form-data',
  },
});

// Interceptor to attach token dynamically
axiosUtils.interceptors.request.use(async (config) => {
  const { token } = await getCookie();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

function axiosErrorHandle(error: any): AxiosResponseType {
  const err = error as AxiosError<any>;
  return {
    success: false,
    errors: err.response?.data?.errors || err.message || 'Something went wrong',
  };
}

export { axiosErrorHandle, axiosUtils };
