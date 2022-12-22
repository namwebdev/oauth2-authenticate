import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token") || null;
  config.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...(token && { token }),
  };
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data;
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
