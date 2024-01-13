import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

import {Spacer} from './Spacer';
import {SmallButton} from './SmallButton';
import {moderateScale, scale} from '../helpers/scaleHelpers';

interface CardProps {
  title: string;
  subtitle: string;
  onPressDelete: () => void;
  onPressEdit?: () => void;
}

export const Card: React.FC<CardProps> = props => {
  const {title, subtitle, onPressDelete, onPressEdit} = props;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>{title}</Text>
        <Text style={styles.label}>{subtitle}</Text>
      </View>
      <View>
        {onPressEdit ? (
          <SmallButton
            label="Edit"
            onPress={onPressEdit}
            extendedStyles={styles.editButton}
          />
        ) : null}
        <Spacer padding={4} />
        <SmallButton
          label="Delete"
          onPress={onPressDelete}
          extendedStyles={styles.deleteButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: moderateScale(18),
    justifyContent: 'space-between',
  },
  label: {
    fontSize: scale(14),
  },
  deleteButton: {backgroundColor: 'red'},
  editButton: {backgroundColor: 'gray'},
});
