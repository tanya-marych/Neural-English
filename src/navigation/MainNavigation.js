import { createDrawerNavigator } from 'react-navigation-drawer';

import CreationNavigation from './CreationNavigation';
import LearningNavigation from './LearningNavigation';
const DrawerNavigation = createDrawerNavigator({
  Creation: CreationNavigation,
  Learning: LearningNavigation,
}, {
  initialRouteName: 'Learning',
});

export default DrawerNavigation;
