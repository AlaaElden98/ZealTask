import axios from 'axios';

import {AddLocationInput, Location} from '../interfaces/LocationApisInterfaces';

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

export const addLocationByMail = async ({
  userMail,
  location,
}: AddLocationInput) => {
  const {lat, lng} = location;
  await axios.post(`/location/${userMail}`, {lat, lng});
};

export const deleteLocationById = async (locationId: number) =>
  await axios.delete(`/location/${locationId}`);
