import axios from 'axios';

const customAxios = axios.create();

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
