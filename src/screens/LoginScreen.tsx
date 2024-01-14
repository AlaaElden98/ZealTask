import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import {useMutation} from '@tanstack/react-query';

import {logUser} from '../api/authApis';
import {useInput} from '../hooks/useInput';
import {setAxiosToken} from '../api/axiosConfig';
import {LoginScreenProps} from '../navigation/types';
import {storeToken} from '../helpers/asyncStorageHelpers';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const LoginScreen = (props: LoginScreenProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const mailInput = useInput();
  const passwordInput = useInput();

  const logUserMutation = useMutation({
    mutationKey: ['logUserMutation'],
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
    passwordInput.onChangeText(text);
  };

  const onMailChange = (text: string) => {
    if (errorMessage) setErrorMessage('');
    mailInput.onChangeText(text);
  };

  const onPressSubmit = () => {
    logUserMutation.mutate({
      email: mailInput.value,
      password: passwordInput.value,
    });
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
    <ScrollView>
      <View style={styles.topTextContainer}>
        <Text style={styles.welcomeText}>Welcom Back</Text>
      </View>
      <View style={{paddingHorizontal: moderateScale(14)}}>
        <LabeledInput
          label="Email"
          value={mailInput.value}
          editable={!logUserMutation.isPending}
          onChangeText={onMailChange}
        />
        <Spacer padding={8} />
        <LabeledInput
          secureText
          label="Passowrd"
          editable={!logUserMutation.isPending}
          value={passwordInput.value}
          onChangeText={onPasswordChange}
        />
        <Spacer padding={8} />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <Spacer padding={36} />
        <LargeButton
          label="Login"
          onPress={onPressSubmit}
          loading={logUserMutation.isPending}
          disabled={!mailInput.value || !passwordInput.value}
        />
        <Spacer padding={10} />
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onPressRegister}
          style={styles.registerButton}>
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topTextContainer: {alignItems: 'center', paddingVertical: moderateScale(40)},
  errorText: {color: 'red', fontSize: scale(12), fontWeight: 'bold'},
  registerButton: {alignSelf: 'flex-end', marginBottom: moderateScale(10)},
  welcomeText: {fontSize: scale(16), fontWeight: 'bold'},
});
