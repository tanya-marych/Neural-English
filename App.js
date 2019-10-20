import React, { Component } from 'react';
import { createAppContainer } from 'react-navigation';

import MainNavigation from './navigation/MainNavigation';

const AppContainer = createAppContainer(MainNavigation);

export default AppContainer;
