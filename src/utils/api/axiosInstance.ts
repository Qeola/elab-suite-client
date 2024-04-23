import axios from "axios";

const axiosInstance = axios.create();

// interceptor for http
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject((error.response && error.response.data) || "Wrong Services"),
);

export default axiosInstance;
