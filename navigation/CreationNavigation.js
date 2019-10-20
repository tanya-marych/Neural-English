import { createStackNavigator } from 'react-navigation-stack';

import CreationScreen from '../screens/CreationScreen';

const AppNavigator = createStackNavigator(
{
  Creation: CreationScreen,
},
{
  initialRouteName: 'Creation',
});

export default AppNavigator;