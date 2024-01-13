import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStackParamList} from './types';
import {AddLocationScreen, DetailsScreen, HomeScreen} from '../screens';

const MainStack = createNativeStackNavigator<MainStackParamList>();
const queryClient = new QueryClient();

export const MainStackScreens = () => (
  <QueryClientProvider client={queryClient}>
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Details" component={DetailsScreen} />
      <MainStack.Screen name="AddLocation" component={AddLocationScreen} />
    </MainStack.Navigator>
  </QueryClientProvider>
);
