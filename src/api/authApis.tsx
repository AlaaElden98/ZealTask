import axios from 'axios';

import {ApiResponse} from '../interfaces/ApiResponsesInterfaces';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const result: ApiResponse = {success: false, errorText: ''};
  try {
    await axios.post('/register', {email, password, name});
    result.success = true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      result.errorText = error.response?.data;
    }
  }
  return result;
};

export const logUser = async (email: string, password: string) => {
  const result: ApiResponse = {success: false, errorText: ''};
  try {
    await axios.post('/login', {email, password});
    result.success = true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      result.errorText = error.response?.data.error;
    }
  }
  return result;
};
