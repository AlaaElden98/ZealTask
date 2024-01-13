import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  DetailsScreen,
  AddEditUserScreen,
  AddLocationScreen,
} from '../screens';
import {MainStackParamList} from './types';

const MainStack = createNativeStackNavigator<MainStackParamList>();

export const MainStackScreens = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={HomeScreen} />
    <MainStack.Screen name="Details" component={DetailsScreen} />
    <MainStack.Screen
      name="AddLocation"
      component={AddLocationScreen}
      options={{title: 'Add Location'}}
    />
    <MainStack.Screen
      name="AddEditUser"
      component={AddEditUserScreen}
      options={({route}) => ({
        title: route.params?.isEditMode ? 'Edit User' : 'Add User',
      })}
    />
  </MainStack.Navigator>
);
