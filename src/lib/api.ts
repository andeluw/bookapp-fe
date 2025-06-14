import axios, { AxiosError } from 'axios';

import { UninterceptedApiError } from '@/types/api';
// let context = <GetServerSidePropsContext>{};

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

api.defaults.withCredentials = false;

api.interceptors.response.use(
  (config) => {
    return config;
  },
  (error: AxiosError<UninterceptedApiError>) => {
    if (error.response?.data.error) {
      return Promise.reject({
        ...error,
        response: {
          ...error.response,
          data: {
            ...error.response.data,
            message:
              typeof error.response.data.error === 'string'
                ? error.response.data.error
                : Object.values(error.response.data.error)[0][0],
          },
        },
      });
    }
    return Promise.reject(error);
  }
);

// export const setApiContext = (_context: GetServerSidePropsContext) => {
//   context = _context;
//   return;
// };

export default api;
