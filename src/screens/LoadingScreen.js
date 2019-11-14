import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { NavigatorFlows } from '../navigation/Navigator';
import { Color } from '../constants';
import Wording from '../wording';
import { getCurrentLang } from '../redux/selectors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.YELLOW_ORANGE(),
  },
  title: {
    color: Color.WHITE(),
    fontSize: 24,
    fontWeight: 'bold',
  },
});

class LoadingScreen extends React.Component {
  componentDidMount() {
    this.bootstrap();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrap = () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(this.props.currentLanguage
      ? NavigatorFlows.MAIN
      : NavigatorFlows.INTRO);
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{Wording.app}</Text>
          <ActivityIndicator />
        </View>
      </View>
    );
  }
}

LoadingScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
  currentLanguage: PropTypes.oneOfType([PropTypes.string, null]).isRequired,
}

function mapStateToProps(state) {
  return {
    currentLanguage: getCurrentLang(state),
  };
}

export default connect(mapStateToProps)(LoadingScreen);
