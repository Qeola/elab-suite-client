import axiosInstance from "./axiosInstance";

export const postRequest = async (url: string, data?: any): Promise<any> => {
  try {
    const result = await axiosInstance.post(url, data);
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};

export const getRequest = async (url: string): Promise<any> => {
  try {
    const result = await axiosInstance.get(url);
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};

export const putRequest = async (url: string, data?: any): Promise<any> => {
  try {
    const result = await axiosInstance.put(url, data);
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};

export const patchRequestAvatar = async (
  url: string,
  data?: any,
): Promise<any> => {
  try {
    const result = await axiosInstance.patch(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};

export const patchRequest = async (url: string, data?: any): Promise<any> => {
  try {
    const result = await axiosInstance.patch(url, data);
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};

export const deleteRequest = async (url: string): Promise<any> => {
  try {
    const result = await axiosInstance.delete(url);
    return result;
  } catch (error: any) {
    return error.errors || error;
  }
};
