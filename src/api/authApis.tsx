import axios from 'axios';

export const registerUser = async (props: {
  email: string;
  password: string;
  name: string;
}) => {
  const {email, password, name} = props;
  const response = await axios.post('/register', {email, password, name});
  return response.data;
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
