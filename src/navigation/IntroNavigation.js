import { createStackNavigator } from 'react-navigation-stack';

import WelcomeScreen from '../screens/WelcomeScreen';

export const CREATION_ROUTES = {
  WELCOME_SCREEN: 'WelcomeScreen',
}

const IntroNavigation = createStackNavigator(
{
  [CREATION_ROUTES.WELCOME_SCREEN]: WelcomeScreen,
},
{
  initialRouteName: CREATION_ROUTES.WELCOME_SCREEN,
  headerMode: 'none',
});

export default IntroNavigation;