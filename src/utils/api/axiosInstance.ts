import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "https://elab-suite-api.onrender.com/api/v1";

const getToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return token ? token : null;
  }
  return null;
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
        toast.error(
          "Request timed out. Please check your internet connection.",
        );
      } else if (error.code === "ERR_NETWORK") {
        toast.error("Network error!. Please try again");
      } else {
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong!",
    );
  },
);

export default axiosInstance;
