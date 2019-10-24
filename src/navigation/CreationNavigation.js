import { createStackNavigator } from 'react-navigation-stack';

import CreationScreen from '../screens/CreationScreen';
import SelectCreationTypeScreen from '../screens/SelectCreationTypeScreen';

import defaultNavigationOptions from '../components/Navigation/Header';

export const CREATION_ROUTES = {
  SELECT_CREATION_TYPE: 'SelectCreationType',
  CREATION: 'Creation',
}

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