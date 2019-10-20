import { createStackNavigator } from 'react-navigation-stack';

import LearningScreen from '../screens/LearningScreen';

const AppNavigator = createStackNavigator(
{
  Learning: LearningScreen,
},
{
  initialRouteName: 'Learning',
});

export default AppNavigator;