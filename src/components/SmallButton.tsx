import React from 'react';
import {
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {moderateScale, scale} from '../helpers/scaleHelpers';

interface SmallButtonProps {
  label: string;
  onPress: () => void;
  extendedStyles?: StyleProp<ViewStyle>;
  labelStyles?: StyleProp<TextStyle>;
}

export const SmallButton: React.FC<SmallButtonProps> = ({
  label,
  onPress,
  extendedStyles,
  labelStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.container, extendedStyles]}
      hitSlop={styles.hitSlop}>
      <Text style={[styles.label, labelStyles]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(2),
    paddingHorizontal: moderateScale(8),
  },
  hitSlop: {
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
  },
  label: {
    fontSize: scale(12),
    color: 'white',
  },
});
