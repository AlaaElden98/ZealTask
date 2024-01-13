import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {logUser} from '../api/authApis';
import {setAxiosToken} from '../api/axiosConfig';
import {storeToken} from '../helpers/asyncStorageHelpers';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';
import {SCREEN_NAMES, STACK_NAMES} from '../constant/navigationConstants';

export const LoginScreen = (props: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [mailText, setMailText] = useState('');
  const [passwordText, setPassword] = useState('');
  const [mailErrorMsg, setMailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');

  const onPasswordChange = (text: string) => {
    if (!loading) {
      if (text.length > 0) setPasswordErrorMsg('');
      setPassword(text);
    }
  };

  const onMailChange = (text: string) => {
    if (!loading) {
      if (text.length > 0) setMailErrorMsg('');
      setMailText(text);
    }
  };

  const onPressSubmit = async () => {
    let allFieldsValid = true;
    // api doesn't apply any validation on mail, so we will allow anything but empty mail
    if (mailText.length === 0) {
      setMailErrorMsg('Email field is required');
      allFieldsValid = false;
    }
    // Server require 8 characters, UX wise it's better to check here if password meets the requirements
    // but what if the requirements change on server ? or what if an old user registerd with password <8 charachters before the requirements applied ?
    if (passwordText.length === 0) {
      setPasswordErrorMsg('Password field is required');
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      handleLogUser();
    }
  };

  const handleLogUser = async () => {
    setLoading(true);
    const response = await logUser(mailText, passwordText);
    setLoading(false);
    if (response.success && response.adminData?.token) {
      handleSuccessLogIn(response.adminData.token);
    } else {
      setMailErrorMsg(response.errorText || 'Something went wrong');
      setPasswordErrorMsg(response.errorText || 'Something went wrong');
    }
  };

  const handleSuccessLogIn = (token: string | null) => {
    const {navigation} = props;
    storeToken(token);
    setAxiosToken(token);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: STACK_NAMES.MainStack,
          state: {routes: [{name: SCREEN_NAMES.HomeScreen}]},
        },
      ],
    });
  };

  const onPressRegister = () => {
    const {navigation} = props;
    navigation.navigate(SCREEN_NAMES.RegisterScreen);
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
          editable={!loading}
          onChangeText={onMailChange}
        />
        <Text style={styles.errorText}>{mailErrorMsg}</Text>
        <Spacer padding={8} />
        <LabeledInput
          secureText
          label="Passowrd"
          editable={!loading}
          value={passwordText}
          onChangeText={onPasswordChange}
        />
        <Text style={styles.errorText}>{passwordErrorMsg}</Text>
        <Spacer padding={36} />
        <LargeButton label="Submit" onPress={onPressSubmit} loading={loading} />
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
  errorText: {color: 'red', fontSize: scale(8)},
  registerButton: {alignSelf: 'flex-end'},
});
