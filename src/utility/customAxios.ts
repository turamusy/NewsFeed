import axios, {AxiosRequestConfig} from 'axios';
import qs from 'qs';

/**
 * Setting the base URL and serializing the parameters
 * @type {AxiosInstance}
 */
export const customAxios = axios.create({
  paramsSerializer: params =>
    qs.stringify(params, {indices: false, arrayFormat: 'repeat'}),
});

/**
 * Adding configuration parameters for default requests
 */
customAxios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.params = config.params || {};
  return config;
});

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return error.response?.data;
  },
);
