import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {moderateScale} from '../helpers/scaleHelpers';

interface LabeledInputProps {
  label: string;
  placeHolder?: string;
  onChangeText: any;
  secureText?: boolean;
  value?: string;
  editable?: boolean;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({
  label,
  value,
  secureText,
  placeHolder,
  onChangeText,
  editable,
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
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: moderateScale(12),
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
  },
});
