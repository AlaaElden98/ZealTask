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
import {useInput} from '../hooks/useInput';
import {queryKeys} from '../constants/queryKeys';
import {addUser, updateUser} from '../api/userApis';
import {AddEditUserScreenProps} from '../navigation/types';
import {moderateScale, scale} from '../helpers/scaleHelpers';
import {LocationInput} from '../interfaces/CommonInterfaces';

export const AddEditUserScreen = (props: AddEditUserScreenProps) => {
  const {route, navigation} = props;
  const {isEditMode, userData, location} = route.params;
  const fillInputs = isEditMode && userData;

  const queryClient = useQueryClient();

  const [newLocations, setNewLocations] = useState<Array<LocationInput>>([]);

  const userNameInput = useInput(fillInputs ? userData.name : '');
  const emailInput = useInput(fillInputs ? userData.email : '');

  const addNewUser = useMutation({
    mutationKey: ['addNewUserMutation'],
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.users]});
      queryClient.refetchQueries({queryKey: [queryKeys.allLocations]});
      navigation.goBack();
    },
  });

  const updateUserMutation = useMutation({
    mutationKey: ['updateUserMutation'],
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.users]});
      navigation.goBack();
    },
  });

  const onPressSubmit = () => {
    if (isEditMode) {
      updateUserMutation.mutate({
        name: userNameInput.value,
        email: emailInput.value,
        userCurrentMail: userData?.email,
      });
    } else {
      addNewUser.mutate({
        name: userNameInput.value,
        email: emailInput.value,
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

  const getSubmitButtonState = () =>
    (isEditMode && userData?.name === userNameInput.value) ||
    (!isEditMode && (!emailInput.value || !userNameInput.value));

  const renderListHeader = () => (
    <View style={styles.Listheader}>
      <Text style={{fontSize: scale(14)}}>
        Locations # {newLocations.length}
      </Text>
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
        value={userNameInput.value}
        onChangeText={userNameInput.onChangeText}
        editable={!addNewUser.isPending && !updateUserMutation.isPending}
      />
      <Spacer padding={15} />
      <LabeledInput
        label="Email"
        value={emailInput.value}
        onChangeText={emailInput.onChangeText}
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
        disabled={getSubmitButtonState()}
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
