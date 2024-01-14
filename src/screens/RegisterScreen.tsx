import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';
import {View, Text, StyleSheet} from 'react-native';

import {useInput} from '../hooks/useInput';
import {registerUser} from '../api/authApis';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const RegisterScreen = (props: {navigation: any}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const mailInput = useInput();
  const nameInput = useInput();
  const passwordInput = useInput();

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
    passwordInput.onChangeText(text);
  };

  const onMailChange = (text: string) => {
    if (errorMessage) setErrorMessage('');
    mailInput.onChangeText(text);
  };

  const onPressSubmit = async () => {
    let errorMsg = '';
    if (mailInput.value.length === 0) {
      errorMsg += 'Email is required - ';
    }
    if (passwordInput.value.length < 8) {
      errorMsg += 'Password must be 8 or more';
    }
    if (!errorMessage) {
      registerUserMutation.mutate({
        name: nameInput.value,
        email: mailInput.value,
        password: passwordInput.value,
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
    mailInput.onChangeText('');
    nameInput.onChangeText('');
    passwordInput.onChangeText('');
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
          value={nameInput.value}
          editable={!registerUserMutation.isPending}
          onChangeText={nameInput.onChangeText}
        />
        <Spacer padding={8} />
        <LabeledInput
          label="Email"
          value={mailInput.value}
          editable={!registerUserMutation.isPending}
          onChangeText={onMailChange}
        />
        <Spacer padding={8} />
        <LabeledInput
          secureText
          label="Passowrd"
          editable={!registerUserMutation.isPending}
          value={passwordInput.value}
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
