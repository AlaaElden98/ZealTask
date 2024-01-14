import React from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import {moderateScale, scale} from '../helpers/scaleHelpers';

interface LargeButtonProps {
  label: string;
  onPress: () => void;
  loading?: boolean;
  extendedStyles?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  label,
  onPress,
  loading,
  disabled,
  labelStyle,
  extendedStyles,
}) => {
  const styles = getStyles(disabled);
  return (
    <TouchableOpacity
      disabled={loading || disabled}
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, extendedStyles]}
      hitSlop={styles.hitSlop}>
      {loading ? (
        <ActivityIndicator color="black" size="small" />
      ) : (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const getStyles = (isDisabled: boolean | undefined) =>
  StyleSheet.create({
    container: {
      borderWidth: 0.5,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      padding: moderateScale(14),
      backgroundColor: isDisabled ? 'gray' : 'transparent',
    },
    hitSlop: {
      top: 10,
      left: 5,
      right: 5,
      bottom: 10,
    },
    label: {
      color: 'black',
      fontSize: scale(14),
    },
  });
