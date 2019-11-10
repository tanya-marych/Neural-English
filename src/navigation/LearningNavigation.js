import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from '../components/Navigation/Header';

import DictionaryScreen from '../screens/DictionaryScreen';
import StudyScreen from '../screens/StudyScreen';
import EditWordScreen from '../screens/EditWordScreen';

export const LEARING_ROUTES = {
  DICTIONARY: 'Dictionary',
  STUDY: 'Study',
  EDIT_WORD: 'EditWord',
}

const AppNavigator = createStackNavigator(
{
  [LEARING_ROUTES.DICTIONARY]: DictionaryScreen,
  [LEARING_ROUTES.STUDY]: StudyScreen,
  [LEARING_ROUTES.EDIT_WORD]: EditWordScreen,
},
{
  initialRouteName: LEARING_ROUTES.DICTIONARY,
  defaultNavigationOptions,
});

export default AppNavigator;