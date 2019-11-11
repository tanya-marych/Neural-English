import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from '../components/Navigation/Header';

import SettingsScreen from '../screens/SettingsScreen';

export const SETTINGS_ROUTES = {
  SETTINGS: 'Settings',
}

const AppNavigator = createStackNavigator(
{
  [SETTINGS_ROUTES.SETTINGS]: SettingsScreen,
},
{
  initialRouteName: SETTINGS_ROUTES.SETTINGS,
  defaultNavigationOptions,
});

export default AppNavigator;