import React, {useState} from 'react';
import axios, {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

import {useInput} from '../hooks/useInput';
import {registerUser} from '../api/authApis';
import {RegisterScreenProps} from '../navigation/types';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const RegisterScreen = (props: RegisterScreenProps) => {
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
    <ScrollView contentContainerStyle={{flex: 1}}>
      <View style={styles.inputs}>
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
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <LargeButton
          label="Register"
          onPress={onPressSubmit}
          loading={registerUserMutation.isPending}
          disabled={
            !nameInput.value || !mailInput.value || !passwordInput.value
          }
        />
        {registerUserMutation.isPending ? (
          <Text style={{color: 'black'}}>
            *You will be directed to Login in few seconds
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(14),
  },
  inputs: {
    paddingTop: moderateScale(30),
    paddingHorizontal: moderateScale(14),
  },
  errorText: {color: 'red', fontSize: scale(12), fontWeight: 'bold'},
});
