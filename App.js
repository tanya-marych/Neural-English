import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';

import MainNavigation from './src/navigation/MainNavigation';

import configureStore from './src/redux/store.js';

const store = configureStore();
const AppContainer = createAppContainer(MainNavigation);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

