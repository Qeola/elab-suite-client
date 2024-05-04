import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://elab-suite-api.onrender.com/api/v1/auth";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null;
};

const getAuthorizationHeader = () => {
  const token = getToken();
  return token ? `Bearer ${token}` : null;
};

const axiosInstance = axios.create({
  baseURL,
  headers: {
    Authorization: getAuthorizationHeader(),
    Accept: "application/json",
  },
});

// Interceptor for http
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.isAxiosError) {
      if (error.code === "ECONNABORTED") {
        console.error("Request timed out!");
        toast.error(
          "Request timed out. Please check your internet connection.",
        );
      } else if (error.code === "ERR_NETWORK") {
        console.error("Network error:", error);
        toast.error("Network error occurred. Please try again later.");
      } else {
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services",
    );
  },
);

export default axiosInstance;
