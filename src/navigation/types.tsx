import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {UserData} from '../interfaces/UserApisInterfaces';
import {LocationInput} from '../interfaces/CommonInterfaces';

export type MainStackParamList = {
  Home: undefined;
  Details: {userData: UserData};
  AddLocation: {userMail?: string} | undefined;
  AddEditUser: {
    isEditMode: boolean;
    userData?: UserData;
    location?: LocationInput;
  };
};

export type HomeScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Home'>;
  route: RouteProp<MainStackParamList, 'Home'>;
};

export type AddLocationScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'AddLocation'>;
  route: RouteProp<MainStackParamList, 'AddLocation'>;
};

export type DetailsScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'Details'>;
  route: RouteProp<MainStackParamList, 'Details'>;
};

export type AddEditUserScreenProps = {
  navigation: NativeStackNavigationProp<MainStackParamList, 'AddEditUser'>;
  route: RouteProp<MainStackParamList, 'AddEditUser'>;
};
