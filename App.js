import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';

import MainNavigation from './src/navigation/MainNavigation';

const AppContainer = createAppContainer(MainNavigation);

export default AppContainer;
