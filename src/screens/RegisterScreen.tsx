import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {registerUser} from '../api/authApis';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const RegisterScreen = (props: {navigation: any}) => {
  const [loading, setLoading] = useState(false);
  const [nameText, setNameText] = useState('');
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
    if (mailText.length === 0) {
      setMailErrorMsg('Email field is required');
      allFieldsValid = false;
    }
    if (passwordText.length === 0) {
      setPasswordErrorMsg('Password field is required');
      allFieldsValid = false;
    }
    if (allFieldsValid) {
      handleRegisterUser();
    }
  };

  const handleRegisterUser = async () => {
    const {navigation} = props;
    setLoading(true);
    const response = await registerUser(mailText, passwordText, nameText);
    if (response.success) {
      resetState();
      navigation.navigate('Login');
    } else {
      response.errorText.includes('user')
        ? setMailErrorMsg(response.errorText)
        : setPasswordErrorMsg(response.errorText);
    }
    setLoading(false);
  };

  const resetState = () => {
    setMailText('');
    setNameText('');
    setPassword('');
    setMailErrorMsg('');
    setPasswordErrorMsg('');
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
          editable={!loading}
          onChangeText={setNameText}
        />
        <Spacer padding={8} />
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
        <LargeButton
          label="Register"
          onPress={onPressSubmit}
          loading={loading}
        />
        {loading ? (
          <Text>*You will be directed to Login in few seconds</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topTextContainer: {alignItems: 'center', paddingVertical: moderateScale(40)},
  errorText: {color: 'red', fontSize: scale(8)},
});
