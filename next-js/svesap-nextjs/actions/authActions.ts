'use server';

import { pathConstants } from '@/constants/pathConstants';
import { AxiosResponseType } from '@/types/responseTypes';
import { axiosErrorHandle, axiosUtils } from '@/utils/axiosUtils';
import { cookies } from 'next/headers';

export const loginAction = async (values: {
  email: string;
  password: string;
}): Promise<AxiosResponseType> => {
  //
  try {
    const res: AxiosResponseType = (
      await axiosUtils.post(pathConstants.api.post.login, values)
    )?.data;

    if (res.success) {
      await setCookie(res);
    }
    return res;
    //
  } catch (error) {
    return axiosErrorHandle(error);
  }
};

export const logoutAction = async (): Promise<AxiosResponseType> => {
  //
  try {
    const res: AxiosResponseType = (
      await axiosUtils.post(pathConstants.api.post.logout)
    )?.data;

    if (res.success) {
      await setCookie(res);
    }
    return res;
    //
  } catch (error) {
    return axiosErrorHandle(error);
  }
};

const setCookie = async (resData: AxiosResponseType) => {
  const cookie = await cookies();
  cookie?.set(
    'admin-login',
    JSON.stringify({
      state: { token: resData?.data?.token, user: resData?.data?.user },
    })
  );
};

export const getCookie = async () => {
  const cookie = (await cookies())?.get('admin-login');
  const cookieValue = cookie ? JSON.parse(cookie.value)?.state : undefined;
  const token = cookieValue?.token;
  const user = cookieValue?.user;
  return { token, user };
};
