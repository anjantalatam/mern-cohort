import axios from 'axios';
import { getApiEndpoint } from './utility';

const url = getApiEndpoint(import.meta.env.VITE_ENV);
console.log({ 'import.meta.env.VITE_ENV': import.meta.env.VITE_ENV });

const customAxios = axios.create({
  baseURL: url,
});

const setAuthInterceptor = (logout) => {
  customAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        const errorCode = error.response.data.code;
        if (errorCode === 'token_expired') {
          logout();
        }
      }

      return Promise.reject(error);
    }
  );
};

export { customAxios, setAuthInterceptor };
