import {Location} from './LocationApisInterfaces';
import {UserData} from './UserApisInterfaces';

export interface LocationInput {
  lat: string;
  lng: string;
}

export interface LocationsAndUsers {
  locations: Location[];
  users: UserData[];
}
