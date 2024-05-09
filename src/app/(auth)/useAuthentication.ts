import { useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/utils/api/apiRequests";
import { loginSuccess } from "@/store/authentication/AuthenticationSlice";
import { useDispatch } from "react-redux";

export const useAuthentication = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const router = useRouter();

  const authenticate = async (endpoint: string, values: any) => {
    setIsLoading(true);
    try {
      const result = await postRequest(endpoint, values);
      console.log({ result });
      setResponse(result.data || result);
      // setShowSnackbar(true);
      setIsLoading(false);
      setTimeout(() => setShowSnackbar(false), 6000);
      return result.data || result;
    } catch (error: any) {
      console.error("Authentication failed:", error);
      setResponse(error.errors);
      // setShowSnackbar(true);
      setIsLoading(false);
      return error.errors;
    }
  };

  const handleAuthentication = async (
    endpoint: string,
    values: any,
    redirectPath: string,
  ) => {
    try {
      const data = await authenticate(endpoint, values);
      if (data.status === "success") {
        router.push(redirectPath);
      }
      if (endpoint === "/auth/login" && data.status === "success") {
        dispatch(loginSuccess({ token: data.token, userData: data.data }));
        localStorage.setItem("token", data.token);
      }
      return data;
    } catch (error) {
      console.error("Authentication failed:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/auth/signin");
  };

  return { isLoading, response, showSnackbar, handleAuthentication, logout };
};
