import { createDrawerNavigator } from 'react-navigation-drawer';

import CreationNavigation from './CreationNavigation';
import LearningNavigation from './LearningNavigation';

const DrawerNavigation = createDrawerNavigator({
  CreationFlow: CreationNavigation,
  LearningFlow: LearningNavigation,
}, {
  initialRouteName: 'CreationFlow',
});

export default DrawerNavigation;
