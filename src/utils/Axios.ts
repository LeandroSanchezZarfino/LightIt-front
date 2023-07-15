import axios from "axios";

const AppAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { "X-Custom-Header": "foobar" }
});

AppAxios.interceptors.request.use(
  function (config) {
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
