import axiosInstance from "./axiosInstance";

const BASE_URL = 'https://elab-suite-api.onrender.com/api/v1/auth';

export const postRequest = async (url: string, data?: any): Promise<any> => {
  try {
    const result = await axiosInstance.post(BASE_URL + url, data);
    return result.data;
  } catch (error:any ) {
    return error.response.data;
  }
};

export const getRequest = async (url: string): Promise<any> => {
  try {
    const result = await axiosInstance.get(BASE_URL + url);
    return result.data;
  } catch (error:any) {
    return error.response.data;
  }
};

export const putRequest = async (url: string, data?: any): Promise<any> => {
  try {
    const result = await axiosInstance.put( BASE_URL + url, data);
    return result.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const deleteRequest = async (url: string): Promise<any> => {
  try {
    const result = await axiosInstance.delete(BASE_URL+ url);
    return result.data;
  } catch (error:any) {
    return error.response.data;
  }
};

