import "server-only";

import axios from "axios";
import { GetCookieHelper } from "./lib-cookie";
import { envLib } from "./lib-env";

export async function createAxiosClient() {
  const cookieRes = await GetCookieHelper();

  return axios.create({
    baseURL: envLib.INTERNAL_API_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookieRes?.data?.cookieRes}`,
      "X-Internal-Secret": envLib.INTERNAL_API_SECRET,
    },
  });
}

export async function createAxiosMediaClient() {
  const cookieRes = await GetCookieHelper();

  return axios.create({
    baseURL: envLib.INTERNAL_API_URL,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${cookieRes?.data?.cookieRes}`,
      "X-Internal-Secret": envLib.INTERNAL_API_SECRET,
    },
  });
}
