import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {queryKeys} from '../constants/queryKeys';
import {moderateScale} from '../helpers/scaleHelpers';
import {addLocationByMail} from '../api/locationApis';
import {AddLocationScreenProps} from '../navigation/types';
import {LabeledInput, LargeButton, Spacer} from '../components';

export const AddLocationScreen = (props: AddLocationScreenProps) => {
  const {route, navigation} = props;
  const userMail = route.params?.userMail;

  const queryClient = useQueryClient();
  const [latitudeText, setLatitudeText] = useState('');
  const [longitudeText, setLongitudeText] = useState('');

  const addNewLocation = useMutation({
    mutationKey: ['addNewLocation'],
    mutationFn: addLocationByMail,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.userLocations]});
      navigation.goBack();
    },
  });

  const onPressSubmit = () => {
    if (userMail) {
      addNewLocation.mutate({
        userMail,
        location: {lat: latitudeText, lng: longitudeText},
      });
    } else {
      navigation.navigate('AddEditUser', {
        isEditMode: false,
        location: {lat: latitudeText, lng: longitudeText},
      });
    }
  };

  return (
    <View style={styles.container}>
      <Spacer padding={20} />
      <LabeledInput
        label="Latitude"
        value={latitudeText}
        keyboardType="number-pad"
        onChangeText={setLatitudeText}
        editable={!addNewLocation.isPending}
      />
      <Spacer padding={15} />
      <LabeledInput
        label="Longitude"
        value={longitudeText}
        keyboardType="number-pad"
        onChangeText={setLongitudeText}
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
