import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (token: string) => {
  try {
    await AsyncStorage.setItem('token', token);
    return true;
  } catch (err) {
    return false;
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value ? value : '';
  } catch (e) {
    return '';
  }
};
