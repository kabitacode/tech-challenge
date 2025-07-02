import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Icons from '@react-native-vector-icons/material-design-icons';
import { themeColor } from '../../utils/theme';

interface HeaderProps {
  title?: string;
  onPress?: () => void;
  customStyle?: {},
  isIconRight?: boolean;
  onPressIconRight?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  isIconRight = false,
  onPressIconRight,
  onPress,
  customStyle = {}
}) => {

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
        <Icons style={styles.icon} name="arrow-left" />
        <Text style={styles.textHeader}>{title}</Text>
      </TouchableOpacity>
      {isIconRight && (
        <TouchableOpacity onPress={onPressIconRight}>
          <Icons name='cart' size={20} color={themeColor.default} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
