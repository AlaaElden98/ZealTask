import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {logUser} from '../api/authApis';
import {setAxiosToken} from '../api/axiosConfig';
import {storeToken} from '../helpers/asyncStorageHelpers';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const LoginScreen = (props: {navigation: any}) => {
  const [mailText, setMailText] = useState('');
  const [passwordText, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const logUserMutation = useMutation({
    mutationKey: ['logUser'],
    mutationFn: logUser,
    onSuccess: token => {
      handleSuccessLogIn(token);
    },
    onError: error => {
      handleFailedLogIn(error);
    },
  });

  const onPasswordChange = (text: string) => {
    if (errorMessage) setErrorMessage('');
    setPassword(text);
  };

  const onMailChange = (text: string) => {
    if (errorMessage) setErrorMessage('');
    setMailText(text);
  };

  const onPressSubmit = async () => {
    let errorMsg = '';
    if (mailText.length === 0) {
      errorMsg += 'Email is required - ';
    }
    // Server require 8 characters on registeration, UX wise it's better to check here if password meets the requirements
    // but what if an old user registerd with password <8 charachters before the requirements applied ? what if the requirements change on server ?
    if (passwordText.length === 0) {
      errorMsg += 'Password is required';
    }

    if (!errorMessage) {
      logUserMutation.mutate({email: mailText, password: passwordText});
    } else setErrorMessage(errorMsg);
  };

  const handleSuccessLogIn = (token: string | null) => {
    const {navigation} = props;
    storeToken(token);
    setAxiosToken(token);
    navigation.reset({
      index: 0,
      routes: [{name: 'MainStack', state: {routes: [{name: 'Home'}]}}],
    });
  };

  const handleFailedLogIn = (error: Error | AxiosError<any, any>) => {
    let errorMsg = 'Login failed';
    if (axios.isAxiosError(error)) {
      errorMsg = error.response?.data?.error ?? 'Login Failed';
    }
    setErrorMessage(errorMsg);
  };

  const onPressRegister = () => {
    const {navigation} = props;
    navigation.navigate('Register');
  };

  return (
    <View>
      <View style={styles.topTextContainer}>
        <Text>Welcom Back.</Text>
        <Spacer padding={10} />
        <Text>Login</Text>
      </View>
      <View style={{paddingHorizontal: moderateScale(14)}}>
        <LabeledInput
          label="Email"
          value={mailText}
          editable={!logUserMutation.isPending}
          onChangeText={onMailChange}
        />
        <Spacer padding={8} />
        <LabeledInput
          secureText
          label="Passowrd"
          editable={!logUserMutation.isPending}
          value={passwordText}
          onChangeText={onPasswordChange}
        />
        <Spacer padding={8} />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Spacer padding={36} />
        <LargeButton
          label="Submit"
          onPress={onPressSubmit}
          loading={logUserMutation.isPending}
        />
        <Spacer padding={10} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRegister}
          style={styles.registerButton}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTextContainer: {alignItems: 'center', paddingVertical: moderateScale(40)},
  errorText: {color: 'red', fontSize: scale(12), fontWeight: 'bold'},
  registerButton: {alignSelf: 'flex-end'},
});
