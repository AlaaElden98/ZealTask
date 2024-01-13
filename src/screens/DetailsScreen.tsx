import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import {
  Card,
  Spacer,
  ErrorHolder,
  SmallButton,
  FullScreenLoader,
} from '../components';
import {moderateScale} from '../helpers/scaleHelpers';
import {DetailsScreenProps} from '../navigation/types';
import {Location} from '../interfaces/LocationApisInterfaces';
import {deleteLocationById, getLocationByMail} from '../api/locationApis';

export const DetailsScreen = (props: DetailsScreenProps) => {
  const {userData} = props.route.params;

  const userLocationsQuery = useQuery({
    queryKey: ['userLocations', userData.email],
    queryFn: () => getLocationByMail(userData.email),
  });

  const deleteLocation = useMutation({
    mutationKey: ['deleteLocation'],
    mutationFn: deleteLocationById,
    onSuccess: () => {
      refetchQueries();
    },
  });

  const refetchQueries = () => {
    userLocationsQuery.refetch();
  };

  const onPressDelete = (locaion: Location) => {
    deleteLocation.mutate(locaion.id);
  };

  const onPressAddLocation = () => {
    const {navigation} = props;
    navigation.navigate('AddLocation');
  };

  const checkIsLoading = () =>
    userLocationsQuery.isLoading || deleteLocation.isPending;

  const renderSpacer = () => <Spacer padding={4} />;

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

  if (userLocationsQuery.isError) {
    return (
      <ErrorHolder
        label="Error loading locations"
        onPressReload={refetchQueries}
      />
    );
  }

  return (
    <View style={{paddingHorizontal: moderateScale(14)}}>
      <FullScreenLoader visible={checkIsLoading()} />
      <Spacer padding={10} />
      <Card title={userData.name} subtitle={userData.email} />
      <FlatList
        data={userLocationsQuery.data}
        style={{marginTop: moderateScale(10)}}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderSpacer}
        renderItem={({item}) => (
          <Card
            title={item.id.toString()}
            subtitle={`Lat: ${item.lat}\nLon: ${item.lng}`}
            onPressDelete={() => onPressDelete(item)}
          />
        )}
        ListFooterComponent={renderSpacer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
