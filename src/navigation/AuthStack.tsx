import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AuthStackParamList} from './types';
import {LoginScreen, RegisterScreen} from '../screens';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
  </AuthStack.Navigator>
);
