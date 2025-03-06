import axios from "axios";
import { cookies } from "next/headers";
import { ApiBaseMysql } from "./Helper/ApiBase";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: ApiBaseMysql,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = Cookies.get("access_token");

    if (accessToken) {
      config.headers.Authorization = `JWT ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
