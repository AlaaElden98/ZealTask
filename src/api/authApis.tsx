import axios from 'axios';

import {AuthApiResponse} from '../interfaces/ApiResponsesInterfaces';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const result: AuthApiResponse = {success: false, errorText: ''};
  try {
    const response = await axios.post('/register', {email, password, name});
    result.success = true;
    result.userData = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      result.errorText = error.response?.data;
    }
  }
  return result;
};

export const logUser = async (email: string, password: string) => {
  const result: AuthApiResponse = {success: false, errorText: ''};
  try {
    const response = await axios.post('/login', {email, password});
    result.success = true;
    result.userData = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      result.errorText = error.response?.data.error;
    }
  }
  return result;
};
