import axios from 'axios';
import Config from 'react-native-config';

export const setAxiosConfigurations = () => {
  axios.defaults.baseURL = Config.API_BASE_URL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export const setAxiosToken = (token: string | null) => {
  axios.defaults.headers.common.token = typeof token === 'string' ? token : '';
};
