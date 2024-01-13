import axios from 'axios';

import {AddUpdateUserInput, UserData} from '../interfaces/UserApisInterfaces';

export const getUsers = async (): Promise<Array<UserData>> => {
  const res = await axios.get('/user');
  return res.data.users;
};

export const addUser = async (payload: AddUpdateUserInput) => {
  const {email, name, locations} = payload;
  return await axios.post('/user', {email, name, locations});
};

export const updateUser = async (
  input: AddUpdateUserInput,
): Promise<UserData> => {
  const {email, name, userCurrentMail} = input;
  const response = await axios.patch(`/user/${userCurrentMail}`, {email, name});
  return response.data;
};

export const deleteUser = async (userMail: string) =>
  await axios.delete(`/user/${userMail}`);
