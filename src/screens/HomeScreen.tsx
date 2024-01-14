import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {
  Card,
  Spacer,
  ErrorHolder,
  LargeButton,
  FullScreenLoader,
} from '../components';
import {queryKeys} from '../constants/queryKeys';
import {getAllLocations} from '../api/locationApis';
import {HomeScreenProps} from '../navigation/types';
import {deleteUser, getUsers} from '../api/userApis';
import {UserData} from '../interfaces/UserApisInterfaces';
import {moderateScale, scale} from '../helpers/scaleHelpers';

export const HomeScreen = (props: HomeScreenProps) => {
  const locationsQuery = useQuery({
    queryKey: [queryKeys.allLocations],
    queryFn: getAllLocations,
  });

  const usersQuery = useQuery({
    queryKey: [queryKeys.users],
    queryFn: getUsers,
  });

  const deleteUserMutation = useMutation({
    mutationKey: ['deleteUserMutation'],
    mutationFn: deleteUser,
    onSuccess: () => {
      refetchQueries();
    },
  });

  const refetchQueries = () => {
    locationsQuery.refetch();
    usersQuery.refetch();
  };

  const onPressUser = (user: UserData) => {
    const {navigation} = props;
    navigation.navigate('Details', {userData: user});
  };

  const onPressEdit = (user: UserData) => {
    const {navigation} = props;
    navigation.navigate('AddEditUser', {isEditMode: true, userData: user});
  };

  const onPressDelete = async (user: UserData) => {
    deleteUserMutation.mutate(user.email);
  };

  const onPressAddNewUser = () => {
    const {navigation} = props;
    navigation.navigate('AddEditUser', {isEditMode: false});
  };

  const checkIsLoading = () =>
    usersQuery.isLoading ||
    locationsQuery.isLoading ||
    deleteUserMutation.isPending;

  const renderSpacer = () => <Spacer padding={4} />;

  if (locationsQuery.isError || usersQuery.isError) {
    return (
      <ErrorHolder label="Error loading data" onPressReload={refetchQueries} />
    );
  }

  const getNumberOfLocations = (userId: number) => {
    const userLocations = locationsQuery.data?.filter(
      location => location.userId === userId,
    ).length;
    return `${userLocations} Locations`;
  };

  const renderItem = ({item}: {item: UserData}) => (
    <TouchableOpacity onPress={() => onPressUser(item)} activeOpacity={1}>
      <Card
        key={item.id.toString()}
        title={item.name}
        subtitle={item.email}
        extraInfo={getNumberOfLocations(item.id)}
        onPressDelete={() => onPressDelete(item)}
        onPressEdit={() => onPressEdit(item)}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FullScreenLoader visible={checkIsLoading()} />
      <Spacer padding={6} />
      <Text style={styles.title}>{locationsQuery.data?.length} Locations</Text>
      <Spacer padding={4} />
      <Text style={styles.title}>{usersQuery.data?.length} Users</Text>
      <FlatList
        data={usersQuery.data}
        style={{marginTop: moderateScale(10)}}
        ListHeaderComponent={renderSpacer}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSpacer}
        ListFooterComponent={renderSpacer}
        keyExtractor={item => item.id.toString()}
      />
      <LargeButton
        label="Add New User"
        onPress={onPressAddNewUser}
        extendedStyles={styles.button}
        labelStyle={styles.buttonText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
    paddingHorizontal: moderateScale(14),
  },
  title: {fontSize: scale(18), color: 'black', fontWeight: 'bold'},
  button: {
    marginTop: moderateScale(10),
    marginBottom: moderateScale(20),
  },
  buttonText: {color: 'white', fontSize: scale(14), fontWeight: 'bold'},
});
