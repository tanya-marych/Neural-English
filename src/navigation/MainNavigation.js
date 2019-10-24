import { createDrawerNavigator } from 'react-navigation-drawer';

import CreationNavigation from './CreationNavigation';
import LearningNavigation from './LearningNavigation';
import { Color } from '../constants';

const DrawerNavigation = createDrawerNavigator({
  Creation: CreationNavigation,
  Learning: LearningNavigation,
}, {
  initialRouteName: 'Creation',
});

export default DrawerNavigation;
