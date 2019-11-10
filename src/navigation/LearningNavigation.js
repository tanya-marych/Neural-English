import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from '../components/Navigation/Header';

import DictionaryScreen from '../screens/DictionaryScreen';
import StudyScreen from '../screens/StudyScreen';

export const LEARING_ROUTES = {
  DICTIONARY: 'Dictionary',
  STUDY: 'Study',
}

const AppNavigator = createStackNavigator(
{
  [LEARING_ROUTES.DICTIONARY]: DictionaryScreen,
  [LEARING_ROUTES.STUDY]: StudyScreen,
},
{
  initialRouteName: LEARING_ROUTES.DICTIONARY,
  defaultNavigationOptions,
});

export default AppNavigator;