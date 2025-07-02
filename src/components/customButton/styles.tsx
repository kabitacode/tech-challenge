import { Dimensions, Platform, StyleSheet } from 'react-native';
import { themeColor } from '../../utils/theme';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: '#E7E7E7',
    paddingHorizontal: width * 0.05,
    paddingVertical: width * 0.03,
    backgroundColor: themeColor.primary,
    alignItems: 'center',
    borderRadius: 25
  },
  text: {
    fontWeight: 'bold',
    fontSize: 14,
    color: themeColor.default,
  }
});
