import axios from "axios";
import { toast } from "react-toastify"; // Assuming you're using react-toastify

const axiosInstance = axios.create();

// interceptor for http
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
