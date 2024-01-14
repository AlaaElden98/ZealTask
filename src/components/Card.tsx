import React from 'react';
import {Text, StyleSheet, View, StyleProp, ViewStyle} from 'react-native';

import {Spacer} from './Spacer';
import {SmallButton} from './SmallButton';
import {moderateScale, scale} from '../helpers/scaleHelpers';

interface CardProps {
  title: string;
  subtitle?: string;
  onPressDelete?: () => void;
  onPressEdit?: () => void;
  extendedStyle?: StyleProp<ViewStyle>;
  extraInfo?: string;
}

export const Card: React.FC<CardProps> = props => {
  const {
    title,
    subtitle,
    extraInfo,
    onPressEdit,
    onPressDelete,
    extendedStyle,
  } = props;

  return (
    <View style={[styles.container, extendedStyle]}>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        {extraInfo ? <Text style={styles.subtitle}>{extraInfo}</Text> : null}
      </View>
      <View>
        {onPressEdit ? (
          <SmallButton
            label="Edit"
            onPress={onPressEdit}
            extendedStyles={styles.editButton}
          />
        ) : null}
        {onPressDelete ? (
          <>
            <Spacer padding={4} />
            <SmallButton
              label="Delete"
              onPress={onPressDelete}
              extendedStyles={styles.deleteButton}
            />
          </>
        ) : null}
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
  title: {
    fontSize: scale(18),
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: scale(12),
  },
  deleteButton: {backgroundColor: 'red'},
  editButton: {backgroundColor: 'gray'},
});
