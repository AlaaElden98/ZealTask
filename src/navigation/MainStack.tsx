import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from '../screens';
import {SCREEN_NAMES} from '../constant/navigationConstants';

const MainStack = createNativeStackNavigator();

export const MainStackScreens = () => (
  <MainStack.Navigator>
    <MainStack.Screen name={SCREEN_NAMES.HomeScreen} component={HomeScreen} />
  </MainStack.Navigator>
);
