import React from 'react';
import Modal from 'react-native-modal';

import {View, ActivityIndicator, StyleSheet} from 'react-native';

export const FullScreenLoader = (props: {visible: boolean}) => {
  const {visible} = props;
  return (
    <Modal isVisible={visible} backdropOpacity={0} animationIn="flash">
      <View style={styles.cotainer}>
        <View style={styles.backgroundShadow} />
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size="large"
            color="white"
            style={styles.indicator}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    zIndex: 3,
    right: '-8%',
    width: '120%',
    height: '120%',
    position: 'absolute',
  },
  backgroundShadow: {
    zIndex: 3,
    opacity: 0.3,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'black',
  },
  indicatorContainer: {
    flex: 1,
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {zIndex: 4},
});
