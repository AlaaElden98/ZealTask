import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

import {moderateScale, scale} from '../helpers/scaleHelpers';

interface ErrorHolderInterface {
  label: string;
  onPressReload?: () => void;
}

export const ErrorHolder: React.FC<ErrorHolderInterface> = ({
  label,
  onPressReload,
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    {onPressReload ? (
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPressReload}
        hitSlop={styles.hitSlop}>
        <Text style={styles.text}>Reload</Text>
      </TouchableOpacity>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {fontSize: scale(16)},
  button: {
    borderRadius: 14,
    borderWidth: 0.5,
    marginTop: moderateScale(10),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  hitSlop: {top: 10, bottom: 10, left: 10, right: 10},
  text: {fontSize: scale(14)},
});
