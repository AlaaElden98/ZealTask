import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';

import {moderateScale, scale} from '../helpers/scaleHelpers';

interface LabeledInputProps {
  label: string;
  placeHolder?: string;
  onChangeText: any;
  secureText?: boolean;
  value?: string;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  secureText,
  placeHolder,
  onChangeText,
  editable,
  keyboardType = 'default',
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={placeHolder}
          secureTextEntry={secureText}
          onChangeText={onChangeText}
          value={value}
          editable={editable}
          keyboardType={keyboardType}
          style={{color: 'black'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: moderateScale(8),
    paddingHorizontal: moderateScale(12),
  },
  label: {
    fontSize: scale(14),
    color: 'black',
  },
});
