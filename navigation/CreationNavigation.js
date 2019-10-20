import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

import CreationScreen from '../screens/CreationScreen';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
{
  Creation: CreationScreen,
  Home: HomeScreen,
},
{
  initialRouteName: 'Creation',
});

export default AppNavigator;