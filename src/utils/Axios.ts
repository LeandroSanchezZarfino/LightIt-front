import axios from "axios";
import { getKey } from "./SessionStorage";

const headers: any = {
  'Accept': '*/*',
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

AppAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AppAxios;
