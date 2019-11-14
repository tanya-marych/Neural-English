import React from 'react';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from './src/redux/store.js';
import Navigator from './src/navigation/Navigator';

const AppContainer = createAppContainer(Navigator);

// Render the app container component with the provider around it
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

