import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

import Menu from '../../images/menu.png';
import { Color } from '../../constants';

const styles = StyleSheet.create({
  menu: {
    width: 30,
    height: 30,
    marginLeft: 12,
    marginVertical: 4,
    opacity: 0.5,
  },
});

const defaultNavigationOptions = ({navigation}) => ({
  title: navigation.getParam('title'),
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
      <Image source={Menu} style={styles.menu} />
    </TouchableOpacity>
  ),
  headerStyle: {
    backgroundColor: Color.HEADER,
    borderBottomColor: Color.YELLOW_ORANGE(),
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  },
});

export default defaultNavigationOptions;
