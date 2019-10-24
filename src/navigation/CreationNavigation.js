import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import CreationScreen from '../screens/CreationScreen';
import SelectCreationTypeScreen from '../screens/SelectCreationTypeScreen';

export const CREATION_ROUTES = {
  SELECT_CREATION_TYPE: 'SelectCreationType',
  CREATION: 'Creation',
}
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
  [CREATION_ROUTES.SELECT_CREATION_TYPE]: SelectCreationTypeScreen,
  [CREATION_ROUTES.CREATION]: CreationScreen,

},
{
  initialRouteName: CREATION_ROUTES.SELECT_CREATION_TYPE,
  defaultNavigationOptions,
});

export default AppNavigator;