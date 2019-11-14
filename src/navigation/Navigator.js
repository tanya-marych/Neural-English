import { createSwitchNavigator } from 'react-navigation';
import MainNavigation from './MainNavigation';
import IntroNavigation from './IntroNavigation';
import LoadingScreen from '../screens/LoadingScreen';

export const NavigatorFlows = {
  LOADING: 'Loading',
  INTRO: 'Intro',
  MAIN: 'Main',
}
export default createSwitchNavigator(
  {
    [NavigatorFlows.LOADING]: LoadingScreen,
    [NavigatorFlows.INTRO]: IntroNavigation,
    [NavigatorFlows.MAIN]: MainNavigation,
  },
  {
    initialRouteName: NavigatorFlows.LOADING,
  },
);
