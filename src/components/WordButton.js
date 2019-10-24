import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Paddings, Color } from '../constants';

const WordButton = ({ onPress, text }) => (
  <TouchableOpacity style={styles.container} onPress={() => onPress(text)}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    padding: Paddings.DEFAULT,
    margin: 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.MIDDLE_BLUE,
    borderRadius: 6,
  },
  text: {
    color: Color.WHITE,
    fontWeight: 'bold',
  },
});

export default WordButton;
