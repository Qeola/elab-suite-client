// useAuthentication.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postRequest } from '@/utils/api/apiRequests';

export const useAuthentication = () => {
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
      setShowSnackbar(true);
      setIsLoading(false);
      return result.data ;
    } catch (error:any) {
      console.error('Authentication failed:', error);
      setResponse(error.errors)
      setIsLoading(false);
        return error.errors;
    }
  };

  const handleAuthentication = async (endpoint: string, values: any, redirectPath: string) => {
    try {
      const data = await authenticate(endpoint, values);
      if(endpoint === '/auth/login'){
          localStorage.setItem('token', data.token);
      }
      if(data.status === 'success'){
          router.push(redirectPath);
      }else{
        return;
      }
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const logout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    router.push('/auth/login');
  };


  return { isLoading, response, showSnackbar, handleAuthentication, logout};
};
