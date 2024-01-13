import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';

import {getAllLocations} from '../api/locationApis';
import {HomeScreenProps} from '../navigation/types';
import {deleteUser, getUsers} from '../api/userApis';
import {moderateScale} from '../helpers/scaleHelpers';
import {UserData} from '../interfaces/UserApisInterfaces';
import {Card, ErrorHolder, FullScreenLoader, Spacer} from '../components';

export const HomeScreen = (props: HomeScreenProps) => {
  const locationsQuery = useQuery({
    queryKey: ['locations'],
    queryFn: getAllLocations,
  });

  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const deleteUserMutation = useMutation({
    mutationKey: ['deleteUser'],
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
    console.log(user);
  };

  const onPressEdit = (user: UserData) => {
    const {navigation} = props;
    navigation.navigate('Details', {userData: user});
  };

  const onPressDelete = async (user: UserData) => {
    console.log(user);
    deleteUserMutation.mutate(user.email);
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

  return (
    <View style={styles.container}>
      <FullScreenLoader visible={checkIsLoading()} />
      <Spacer padding={6} />
      <Text># Locations {locationsQuery.data?.length}</Text>
      <Spacer padding={4} />
      <Text># Users {usersQuery.data?.length}</Text>
      <FlatList
        data={usersQuery.data}
        style={{marginTop: moderateScale(10)}}
        ListFooterComponent={renderSpacer}
        ListHeaderComponent={renderSpacer}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => onPressUser(item)}
              activeOpacity={1}>
              <Card
                title={item.name}
                subtitle={item.email}
                onPressDelete={() => onPressDelete(item)}
                onPressEdit={() => onPressEdit(item)}
              />
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={renderSpacer}
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
});
