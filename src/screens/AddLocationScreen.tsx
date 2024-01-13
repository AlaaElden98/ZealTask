import React from 'react';
import {Text, View} from 'react-native';

import {AddLocationScreenProps} from '../navigation/types';

export const AddLocationScreen = (props: AddLocationScreenProps) => {
  const {route} = props;
  const userMail = route.params?.userMail;
  return (
    <View>
      <Text>Location {userMail}</Text>
    </View>
  );
};
