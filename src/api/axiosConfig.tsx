import axios from 'axios';
import Config from 'react-native-config';

import {getToken} from '../helpers/asyncStorageHelpers';

export const setAxiosConfigurations = async () => {
  axios.defaults.baseURL = Config.API_BASE_URL;
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.token = await getToken();
};
