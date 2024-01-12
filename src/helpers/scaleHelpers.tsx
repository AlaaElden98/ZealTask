//https://github.com/nirsky/react-native-size-matters/blob/master/lib/scaling-utils.js
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const shortDimension = width < height ? width : height;

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;

export const scale = (size: number) =>
  (shortDimension / guidelineBaseWidth) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;
