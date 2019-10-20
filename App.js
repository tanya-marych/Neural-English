import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';

import CreationNavigation from './navigation/CreationNavigation';

const AppContainer = createAppContainer(CreationNavigation);

export default AppContainer;
