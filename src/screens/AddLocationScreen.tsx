import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useInput} from '../hooks/useInput';
import {queryKeys} from '../constants/queryKeys';
import {moderateScale} from '../helpers/scaleHelpers';
import {addLocationByMail} from '../api/locationApis';
import {numbersOnlyRegax} from '../helpers/regaxHelpers';
import {AddLocationScreenProps} from '../navigation/types';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const AddLocationScreen = (props: AddLocationScreenProps) => {
  const {route, navigation} = props;
  const userMail = route.params?.userMail;

  const queryClient = useQueryClient();

  const latitudeInput = useInput('', numbersOnlyRegax());
  const longitudeInput = useInput('', numbersOnlyRegax());

  const addNewLocation = useMutation({
    mutationKey: ['addNewLocationMutation'],
    mutationFn: addLocationByMail,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.userLocations]});
      queryClient.invalidateQueries({queryKey: [queryKeys.allLocations]});
      navigation.goBack();
    },
  });

  const onPressSubmit = () => {
    if (userMail) {
      addNewLocation.mutate({
        userMail,
        location: {lat: latitudeInput.value, lng: longitudeInput.value},
      });
    } else {
      navigation.navigate('AddEditUser', {
        isEditMode: false,
        location: {lat: latitudeInput.value, lng: longitudeInput.value},
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spacer padding={20} />
      <LabeledInput
        label="Latitude"
        value={latitudeInput.value}
        keyboardType="number-pad"
        onChangeText={latitudeInput.onChangeText}
        editable={!addNewLocation.isPending}
      />
      <Spacer padding={15} />
      <LabeledInput
        label="Longitude"
        value={longitudeInput.value}
        keyboardType="number-pad"
        onChangeText={longitudeInput.onChangeText}
        editable={!addNewLocation.isPending}
      />
      <View style={styles.buttonContainer}>
        <LargeButton
          label="Submit"
          onPress={onPressSubmit}
          loading={addNewLocation.isPending}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: moderateScale(14), flex: 1},
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: moderateScale(20),
  },
});
