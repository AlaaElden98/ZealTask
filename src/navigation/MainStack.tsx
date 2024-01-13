import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  HomeScreen,
  DetailsScreen,
  AddEditUserScreen,
  AddLocationScreen,
} from '../screens';
import {MainStackParamList} from './types';

const MainStack = createNativeStackNavigator<MainStackParamList>();
const queryClient = new QueryClient();

export const MainStackScreens = () => (
  <QueryClientProvider client={queryClient}>
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
  </QueryClientProvider>
);
