import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Paddings, Color } from '../constants';

const ConfirmButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    paddingVertical: Paddings.DEFAULT,
    paddingHorizontal: 2 * Paddings.DEFAULT,
    margin: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.CELADON_GREEN,
    borderRadius: 6,
  },
  text: {
    color: Color.WHITE(),
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConfirmButton;
