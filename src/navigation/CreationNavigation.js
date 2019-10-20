import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import CreationScreen from '../screens/CreationScreen';

const defaultNavigationOptions =({navigation}) => ({
  headerLeft: (
    <Button
      onPress={() => navigation.toggleDrawer()}
      title="Menu"
      color="black"
    />
  ),
});

const AppNavigator = createStackNavigator(
{
  Creation: CreationScreen,
},
{
  initialRouteName: 'Creation',
  defaultNavigationOptions,
});

export default AppNavigator;