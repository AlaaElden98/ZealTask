import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  Card,
  Spacer,
  LargeButton,
  SmallButton,
  LabeledInput,
} from '../components';
import {queryKeys} from '../constants/queryKeys';
import {addUser, updateUser} from '../api/userApis';
import {moderateScale} from '../helpers/scaleHelpers';
import {AddEditUserScreenProps} from '../navigation/types';
import {LocationInput} from '../interfaces/CommonInterfaces';

export const AddEditUserScreen = (props: AddEditUserScreenProps) => {
  const {route, navigation} = props;
  const {isEditMode, userData, location} = route.params;
  const fillInputs = isEditMode && userData;

  const queryClient = useQueryClient();

  const [newLocations, setNewLocations] = useState<Array<LocationInput>>([]);
  const [emai, setEmail] = useState(fillInputs ? userData.email : '');
  const [userName, setUserName] = useState(fillInputs ? userData.name : '');

  const addNewUser = useMutation({
    mutationKey: ['addNewUserMutation'],
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.users]});
      navigation.goBack();
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ['updateUserMutation'],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.allLocations]});
      queryClient.invalidateQueries({queryKey: [queryKeys.users]});
      navigation.goBack();
    },
  });

  const onPressSubmit = () => {
    if (isEditMode) {
      if (userName === userData?.name && emai === userData?.email) return;
      updateUserMutation.mutate({
        name: userName,
        email: emai,
        userCurrentMail: userData?.email,
      });
    } else {
      addNewUser.mutate({
        name: userName,
        email: emai,
        locations: newLocations,
      });
    }
  };

  const handleAddLocation = useCallback((newLocation: LocationInput) => {
    setNewLocations(prevLocations => [...prevLocations, newLocation]);
  }, []);

  useEffect(() => {
    if (location) handleAddLocation(location);
  }, [handleAddLocation, location]);

  const onPressAddLocation = () => {
    navigation.navigate('AddLocation');
  };

  const onPressDeleteLocation = (indexToRemove: number) => {
    const updatedLocations = newLocations.filter(
      (item, index) => index !== indexToRemove,
    );
    setNewLocations(updatedLocations);
  };

  const getErrorMessage = () => {
    let errorMessage = '';
    if (addNewUser.isError && axios.isAxiosError(addNewUser.error)) {
      errorMessage =
        addNewUser.error.response?.data?.error || 'Error: User not created';
    } else if (
      updateUserMutation.isError &&
      axios.isAxiosError(updateUserMutation.error)
    ) {
      errorMessage =
        updateUserMutation.error.response?.data?.error ||
        'Error: User not updated';
    }
    return errorMessage;
  };

  const renderListHeader = () => (
    <View style={styles.Listheader}>
      <Text>Locations</Text>
      <SmallButton
        label="Add location"
        extendedStyles={styles.addLocationButton}
        onPress={onPressAddLocation}
      />
    </View>
  );

  const renderSpacer = () => <Spacer padding={4} />;

  const renderLocations = () => {
    return (
      <FlatList
        data={newLocations}
        style={{marginTop: moderateScale(10)}}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderSpacer}
        renderItem={({item, index}) => (
          <Card
            title={`Lat: ${item.lat}\nLon: ${item.lng}`}
            onPressDelete={() => onPressDeleteLocation(index)}
          />
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Spacer padding={20} />
      <LabeledInput
        label="Name"
        value={userName}
        onChangeText={setUserName}
        editable={!addNewUser.isPending && !updateUserMutation.isPending}
      />
      <Spacer padding={15} />
      <LabeledInput
        label="Email"
        value={emai}
        onChangeText={setEmail}
        editable={!isEditMode && !addNewUser.isPending}
      />
      <Spacer padding={15} />
      {addNewUser.isError || updateUserMutation.isError ? (
        <Text style={styles.errorText}>{getErrorMessage()}</Text>
      ) : null}
      {!isEditMode ? renderLocations() : null}
      <LargeButton
        label={isEditMode ? 'Edit User' : 'Add User'}
        onPress={onPressSubmit}
        loading={addNewUser.isPending || updateUserMutation.isPending}
        extendedStyles={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {paddingHorizontal: moderateScale(14), flex: 1},
  buttonContainer: {
    justifyContent: 'flex-end',
    marginBottom: moderateScale(20),
  },
  errorText: {
    color: 'red',
  },
  Listheader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(8),
  },
  addLocationButton: {
    backgroundColor: 'green',
  },
});
