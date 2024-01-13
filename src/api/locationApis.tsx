import axios from 'axios';

import {Location} from '../interfaces/LocationApisInterfaces';
import {LocationInput} from '../interfaces/CommonInterfaces';

export const getAllLocations = async (): Promise<Array<Location>> => {
  const res = await axios.get('/location');
  return res.data.locations;
};

export const getLocationByMail = async (
  userMail: string,
): Promise<Array<Location>> => {
  const response = await axios.get(`/location/${userMail}`);
  return response.data.locations;
};

export const addLocationByMail = async (
  userMail: string,
  input: LocationInput,
) => await axios.post(`/user/${userMail}`, {input});

export const updateLocationById = async (
  locationId: number,
  input: LocationInput,
) => {
  const {lat, lng} = input;
  return await axios.patch(`/user/${locationId}`, {lat, lng});
};

export const deleteLocationById = async (locationId: number) =>
  await axios.delete(`/location/${locationId}`);
