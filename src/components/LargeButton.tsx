import React from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
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
}

export const LargeButton: React.FC<LargeButtonProps> = ({
  label,
  onPress,
  loading,
  extendedStyles,
}) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      activeOpacity={0.9}
      style={[styles.container, extendedStyles]}
      hitSlop={styles.hitSlop}>
      {loading ? (
        <ActivityIndicator color="black" size="small" />
      ) : (
        <Text>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(14),
  },
  hitSlop: {
    top: 10,
    left: 5,
    right: 5,
    bottom: 10,
  },
  label: {
    fontSize: scale(14),
  },
});
