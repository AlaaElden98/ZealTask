import {LocationInput} from './CommonInterfaces';

export interface AddUpdateUserInput {
  name: string;
  email: string;
  locations: LocationInput[];
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  adminId: number;
}
