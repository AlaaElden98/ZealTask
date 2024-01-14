import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

import {
  Card,
  Spacer,
  ErrorHolder,
  SmallButton,
  FullScreenLoader,
} from '../components';
import {queryKeys} from '../constants/queryKeys';
import {moderateScale} from '../helpers/scaleHelpers';
import {DetailsScreenProps} from '../navigation/types';
import {Location} from '../interfaces/LocationApisInterfaces';
import {deleteLocationById, getLocationByMail} from '../api/locationApis';

export const DetailsScreen = (props: DetailsScreenProps) => {
  const {userData} = props.route.params;
  const queryClient = useQueryClient();

  const userLocationsQuery = useQuery({
    queryKey: [queryKeys.userLocations, userData.email],
    queryFn: () => getLocationByMail(userData.email),
  });

  const deleteLocation = useMutation({
    mutationKey: ['deleteLocationMutation'],
    mutationFn: deleteLocationById,
    onSuccess: () => {
      refetchQueries();
    },
  });

  const refetchQueries = () => {
    userLocationsQuery.refetch();
    queryClient.invalidateQueries({queryKey: [queryKeys.allLocations]});
  };

  const onPressDelete = (locaion: Location) => {
    deleteLocation.mutate(locaion.id);
  };

  const onPressAddLocation = () => {
    const {navigation} = props;
    navigation.navigate('AddLocation', {userMail: userData.email});
  };

  const checkIsLoading = () =>
    userLocationsQuery.isLoading || deleteLocation.isPending;

  const renderSpacer = () => <Spacer padding={4} />;

  const renderListHeader = () => (
    <View style={styles.Listheader}>
      <Text style={{color: 'black'}}>Locations</Text>
      <SmallButton
        label="Add location"
        extendedStyles={styles.addLocationButton}
        onPress={onPressAddLocation}
      />
    </View>
  );

  const renderItem = ({item}: {item: Location}) => (
    <Card
      key={item.id.toString()}
      title={item.id.toString()}
      subtitle={`Lat: ${item.lat}  Lon: ${item.lng}`}
      onPressDelete={() => onPressDelete(item)}
    />
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
      <Card
        title={userData.name}
        subtitle={userData.email}
        extraInfo={`${userLocationsQuery.data?.length} Locations`}
      />
      <FlatList
        data={userLocationsQuery.data}
        style={{marginTop: moderateScale(10)}}
        ListHeaderComponent={renderListHeader}
        ItemSeparatorComponent={renderSpacer}
        renderItem={renderItem}
        ListFooterComponent={renderSpacer}
        keyExtractor={item => item.id.toString()}
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
