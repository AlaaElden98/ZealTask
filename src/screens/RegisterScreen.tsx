import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';
import {View, Text, StyleSheet} from 'react-native';

import {registerUser} from '../api/authApis';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const RegisterScreen = (props: {navigation: any}) => {
  const [nameText, setNameText] = useState('');
  const [mailText, setMailText] = useState('');
  const [passwordText, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const registerUserMutation = useMutation({
    mutationKey: ['registerUserMutation'],
    mutationFn: registerUser,
    onSuccess: () => {
      handleSuccessRegister();
    },
    onError: error => {
      handleFailedRegister(error);
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
    if (passwordText.length < 8) {
      errorMsg += 'Password must be 8 or more';
    }
    if (!errorMessage) {
      registerUserMutation.mutate({
        name: nameText,
        email: mailText,
        password: passwordText,
      });
    } else setErrorMessage(errorMsg);
  };

  const handleSuccessRegister = () => {
    const {navigation} = props;
    resetState();
    navigation.navigate('Login');
  };

  const handleFailedRegister = (error: Error | AxiosError<any, any>) => {
    let errorMsg = 'Register failed';
    if (axios.isAxiosError(error)) {
      errorMsg = error.response?.data?.error ?? 'Register Failed';
    }
    setErrorMessage(errorMsg);
  };

  const resetState = () => {
    setMailText('');
    setNameText('');
    setPassword('');
  };

  return (
    <View>
      <View style={styles.topTextContainer}>
        <Text>Welcom Back.</Text>
        <Spacer padding={10} />
        <Text>Register</Text>
      </View>
      <View style={{paddingHorizontal: moderateScale(14)}}>
        <LabeledInput
          label="Name"
          value={nameText}
          editable={!registerUserMutation.isPending}
          onChangeText={setNameText}
        />
        <Spacer padding={8} />
        <LabeledInput
          label="Email"
          value={mailText}
          editable={!registerUserMutation.isPending}
          onChangeText={onMailChange}
        />
        <Spacer padding={8} />
        <LabeledInput
          secureText
          label="Passowrd"
          editable={!registerUserMutation.isPending}
          value={passwordText}
          onChangeText={onPasswordChange}
        />
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
        <Spacer padding={36} />
        <LargeButton
          label="Register"
          onPress={onPressSubmit}
          loading={registerUserMutation.isPending}
        />
        {registerUserMutation.isPending ? (
          <Text>*You will be directed to Login in few seconds</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTextContainer: {alignItems: 'center', paddingVertical: moderateScale(40)},
  errorText: {color: 'red', fontSize: scale(12), fontWeight: 'bold'},
});
