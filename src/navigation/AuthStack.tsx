import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SCREEN_NAMES} from '../constant/navigationConstants';
import {LoginScreen, RegisterScreen} from '../screens';

const AuthStack = createNativeStackNavigator();

export const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={SCREEN_NAMES.LoginScreen} component={LoginScreen} />
    <AuthStack.Screen
      name={SCREEN_NAMES.RegisterScreen}
      component={RegisterScreen}
    />
  </AuthStack.Navigator>
);
