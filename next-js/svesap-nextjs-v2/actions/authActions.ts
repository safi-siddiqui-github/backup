'use server';

import { pathConstants } from '@/constants/pathConstants';
import { AxiosResponseType } from '@/types/responseTypes';
import { axiosErrorHandle, axiosUtils } from '@/utils/axiosUtils';
import { cookies } from 'next/headers';

// export const loginAction = async (
//   _: ResponseResultType,
//   formData: FormData
// ): Promise<ResponseResultType> => {
//   const email = formData.get('email') as string;
//   const password = formData.get('password') as string;
//   const old: ResponseResultType['old'] = { email, password };

//   // const validatedFields = loginValidation.safeParse({
//   //   email,
//   //   password,
//   // });

//   // Return early if the form data is invalid
//   // if (!validatedFields.success) {
//   //   return {
//   //     success: false,
//   //     errors: validatedFields.error.flatten().fieldErrors,
//   //     old,
//   //   };
//   // }

//   let res = await axiosUtils.post(pathConstants.api.post.login, {
//     email,
//     password,
//   });

//   const resData: AxiosResponseType = res?.data;

//   if (!resData.success) {
//     return {
//       success: false,
//       errors: resData.errors,
//       old,
//     };
//   }

//   await setCookie(resData);

//   return {
//     success: true,
//     data: resData.data,
//   };
// };

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

export const logoutAction = async (
  _: AxiosResponseType,
  formData: FormData
): Promise<AxiosResponseType> => {
  const { token, user } = await getCookie();

  let res;

  try {
    res = await axiosUtils.post(pathConstants.api.post.logout);
  } catch (error) {
    console.log(error);
  }

  const resData: AxiosResponseType = res?.data;

  await setCookie(resData);

  return {
    success: true,
  };
};
