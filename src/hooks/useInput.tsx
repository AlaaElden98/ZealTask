import {useState} from 'react';

export const useInput = (initialValue: string = '', regax?: RegExp) => {
  const [value, setValue] = useState(initialValue);

  const handleChangeText = (text: string) => {
    if (regax) {
      regax.test(text) ? setValue(text) : null;
    } else setValue(text);
  };

  const inputProps = {
    value: value,
    onChangeText: handleChangeText,
  };

  return inputProps;
};
