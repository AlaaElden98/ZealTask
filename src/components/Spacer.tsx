import React from 'react';
import {View} from 'react-native';

import {moderateScale} from '../helpers/scaleHelpers';

export const Spacer = (props: {padding: number}) => (
  <View style={{padding: moderateScale(props.padding)}} />
);
