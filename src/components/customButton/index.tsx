import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Icons from '@react-native-vector-icons/material-design-icons';

interface Props {
  title?: string;
  onPress?: () => void;
  customStyle?: any
}

const CustomButton: React.FC<Props> = ({
  title,
  onPress,
  customStyle = {}
}) => {

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
