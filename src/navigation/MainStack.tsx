import React from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens';
import {SCREEN_NAMES} from '../constant/navigationConstants';

const MainStack = createNativeStackNavigator();
const queryClient = new QueryClient();

export const MainStackScreens = () => (
  <QueryClientProvider client={queryClient}>
    <MainStack.Navigator>
      <MainStack.Screen name={SCREEN_NAMES.HomeScreen} component={HomeScreen} />
    </MainStack.Navigator>
  </QueryClientProvider>
);
