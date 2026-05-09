import axios from "axios";

export const AxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  withCredentials: true,
  headers: {
    // "Content-Type": "application/json",
    // "Content-Type": "application/form-data",
  },
});

// export type AxiosResponseType<T = AxiosResponseDataType> = AxiosResponse<T>;
// export type AxiosErrorType<T = AxiosResponseDataType> = AxiosError<T>;

// export const AxiosResponseHelper = async (
//   callback: () => Promise<AxiosResponseBodyType>,
// ): Promise<AxiosResponseDataType> => {
//   try {
//     const response = await callback();
//     return response?.data;
//   } catch (error: unknown) {
//     if (isAxiosError<AxiosResponseDataType>(error)) {
//       return error?.response?.data ?? unknownError;
//     }
//     return unknownError;
//     // throw error;
//   }
// };
