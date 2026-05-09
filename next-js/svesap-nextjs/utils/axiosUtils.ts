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
    // 'Content-Type': 'multipart/form-data', // PHP form request boundary error
  },
});

// Interceptor to attach token dynamically
axiosUtils.interceptors.request.use(async (config) => {
  const { token } = await getCookie();

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  // Only set multipart/form-data if the request has FormData
  // console.log(config.data instanceof FormData, typeof window !== 'undefined');
  // if (typeof window !== 'undefined' && config.data instanceof FormData) {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
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
