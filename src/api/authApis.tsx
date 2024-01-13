import axios from 'axios';

import {AuthApiResponse} from '../interfaces/AuthApisInterfaces';

export const registerUser = async (
  email: string,
  password: string,
  name: string,
) => {
  const result: AuthApiResponse = {success: false, errorText: ''};
  try {
    const response = await axios.post('/register', {email, password, name});
    result.success = true;
    result.adminData = response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      result.errorText = error.response?.data;
    }
  }
  return result;
};

export const logUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post('/login', {email, password});
  return response.data;
};
