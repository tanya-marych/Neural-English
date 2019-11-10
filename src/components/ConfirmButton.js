import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity, 
  Text,
  StyleSheet,
  ViewPropTypes,
} from 'react-native';
import { Paddings, Color } from '../constants';

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

const ConfirmButton = ({ onPress, text, containerStyle }) => (
  <TouchableOpacity
    style={[styles.container, containerStyle]}
    onPress={onPress}
  >
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

ConfirmButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  containerStyle: ViewPropTypes.style,
};

ConfirmButton.defaultProps = {
  containerStyle: undefined,
}

export default ConfirmButton;
