import { getKey, removeKey } from "./SessionStorage";

import axios from "axios";
import { notification } from "antd";

const headers: any = {
  "Accept": "application/json",
  "Content-Type": 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
}

const AppAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: headers
});

AppAxios.interceptors.request.use(
  function (config) {
    const token = getKey("token")
    if (token !== null) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


const parseErrorToString = (error: any) => {
  const errorResponse: Array<string> = [];
  Object.keys(error).forEach((key: string) => {
    errorResponse.push(error[key]);
  })

  return errorResponse.join("\n");
}

AppAxios.interceptors.response.use(
  function (response) {
    if (response.data.message) {
      notification.success({
        message: "Success",
        description: response.data.message,
        duration: 5,
      });
    }
    return response;
  },
  function (error) {
    if (error.response.status === 401 && window.location.pathname !== "/") {
      notification.error({
        message: "Session expired",
        description: "Please login again",
        duration: 5,
      });

      setTimeout(() => {
        removeKey("token")
        window.location.replace("/");

      }, 2000)

    } else if (error.response && error.response.status >= 400) {
      notification.error({
        message: "An error has ocurred",
        description: error.response.data.errors ? parseErrorToString(error.response.data.errors) : error.response.data.error,
        duration: 5,
      });
    }

    return Promise.reject(error);
  }
);

export default AppAxios;
