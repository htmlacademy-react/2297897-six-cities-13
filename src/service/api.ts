import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {getToken} from './token.ts';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

const BACKEND_URL = 'https://13.design.pages.academy/six-cities';
const REQUEST_TIME = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response: AxiosResponse) => StatusCodeMapping[response.status];

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIME
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers){
        config.headers['x-token'] = token;
      }

      return config;
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{error: string}>) => {
      if(error.response && shouldDisplayError(error.response)){
        toast.warn(error.response.data.error);
      }

      throw error;
    }
  );

  return api;
};
