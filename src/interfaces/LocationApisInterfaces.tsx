import {LocationInput} from './CommonInterfaces';

export interface Location {
  id: number;
  lat: string;
  lng: string;
  userId: number;
}

export interface AddLocationInput {
  userMail: string;
  location: LocationInput;
}
