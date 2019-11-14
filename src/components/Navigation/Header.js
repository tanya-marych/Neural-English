import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { Color, Paddings } from '../../constants';
import Wording from '../../wording';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Paddings.DEFAULT,
  },
  text: {
    fontSize: 14,
    color: Color.DARK_RASPBERRY,
    fontWeight: 'bold',
  },
});

export const HeaderButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

HeaderButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
}

HeaderButton.defaultProps = {
  title: null,
  onPress: () => null,
}

const defaultNavigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
  headerLeft: (
    <HeaderButton
      onPress={() => navigation.toggleDrawer()}
      title={Wording.menu}
    />
  ),
  headerStyle: {
    borderBottomColor: Color.DARK_RASPBERRY,
    borderBottomWidth: 1,
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

export default defaultNavigationOptions;
