import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from '../components/Navigation/Header';

import LearningScreen from '../screens/LearningScreen';

const AppNavigator = createStackNavigator(
{
  Learning: LearningScreen,
},
{
  initialRouteName: 'Learning',
  defaultNavigationOptions,
});

export default AppNavigator;