import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {getToken} from './src/helpers/asyncStorageHelpers';
import {MainStackScreens} from './src/navigation/MainStack';
import {AuthStackScreens} from './src/navigation/AuthStack';
import {setAxiosConfigurations, setAxiosToken} from './src/api/axiosConfig';

function App(): JSX.Element {
  const [isTokenAvailable, setTokenAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAxiosConfigurations();
    const checkToken = async () => {
      const token = await getToken();
      setAxiosToken(token);
      setTokenAvailable(!!token);
      setLoading(false);
    };
    checkToken();
  }, []);

  const RootStack = createNativeStackNavigator();
  const queryClient = new QueryClient();

  if (loading) {
    return <View />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isTokenAvailable ? 'MainStack' : 'AuthStack'}>
          <RootStack.Screen name="AuthStack" component={AuthStackScreens} />
          <RootStack.Screen name="MainStack" component={MainStackScreens} />
        </RootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
