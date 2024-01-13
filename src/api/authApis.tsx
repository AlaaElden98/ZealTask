import axios from 'axios';

export const registerUser = async (props: {
  email: string;
  password: string;
  name: string;
}) => {
  const {email, password, name} = props;
  return await axios.post('/register', {email, password, name});
};

export const logUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const response = await axios.post('/login', {email, password});
  const token: string = response.data.token;
  return token;
};
