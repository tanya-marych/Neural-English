import { createDrawerNavigator } from 'react-navigation-drawer';

import CreationNavigation from './CreationNavigation';
import LearningNavigation from './LearningNavigation';
import SettingsNavigation from './SettingsNavigation';

const MainNavigation = createDrawerNavigator({
  Creation: CreationNavigation,
  Learning: LearningNavigation,
  Settings: SettingsNavigation,
}, {
  initialRouteName: 'Creation',
});

export default MainNavigation;
