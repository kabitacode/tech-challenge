import { Dimensions, Platform, StyleSheet } from 'react-native';
import { themeColor } from '../../utils/theme';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  header: {
    width: width,
    padding: width * 0.05,
    paddingTop: width * 0.05,
    backgroundColor: themeColor.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  textHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    color: themeColor.default,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 20,
    color: themeColor.default,
    marginRight: width * 0.05,
  },
});
