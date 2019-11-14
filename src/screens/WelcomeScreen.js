import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';

import { NavigatorFlows } from '../navigation/Navigator';
import { Color, Paddings } from '../constants';
import Wording from '../wording';
import { SUPPORTED_LANGUAGES_ARRAY } from '../redux/constants';
import WordButton from '../components/WordButton';
import { addLanguage } from '../redux/actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.YELLOW_ORANGE(),
    padding: 3 * Paddings.DEFAULT,
  },
  center: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    color: Color.WHITE(),
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  text: {
    color: Color.WHITE(),
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  langTitle: {
    color: Color.WHITE(),
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  langContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
});

const INTRO_MODES = {
  WELCOME: 'Welcome',
  LANGUAGE: 'Language',
  TIPS: 'Tips',
};

const SWITCH_DELAY = 5000;

const LanguageMode = ({ onSelectLanguage }) => (
  <View style={styles.container}>
    <View style={styles.center}>
      <Text style={styles.langTitle}>{Wording.languageMode.title}</Text>
      <Text style={styles.text}>{Wording.languageMode.description}</Text>
      <View style={styles.langContainer}>
      {SUPPORTED_LANGUAGES_ARRAY.map((lan, id) => (
          <WordButton
            key={id}
            text={Wording.languages[lan]}
            onPress={() => onSelectLanguage(lan)}
          />
        ))}
      </View>
    </View>
  </View>
);

LanguageMode.propTypes = {
  onSelectLanguage: PropTypes.func.isRequired,
}

class WelcomeScreen extends React.Component {
  state = {
    mode: INTRO_MODES.WELCOME,
    language: null,
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      mode: INTRO_MODES.LANGUAGE,
    }), SWITCH_DELAY);
  }

  handleSelectLanguage = (language) => {
    this.setState({ language, mode: INTRO_MODES.TIPS });

    console.warn('addLanguage', language);
    this.props.addLanguage({ language });

    setTimeout(() => {
      this.props.navigation.navigate(NavigatorFlows.MAIN);
    }, SWITCH_DELAY);
  }

  renderWelcome = () => (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>{Wording.welcome.title}</Text>
        <Text style={styles.text}>{Wording.welcome.description}</Text>
      </View>
    </View>
  );

  renderTips = () => (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>{Wording.tips.title}</Text>
        <Text style={styles.text}>{Wording.tips.description}</Text>
      </View>
    </View>
  );

  // Render any loading content that you like here
  render() {
    switch(this.state.mode) {
      case INTRO_MODES.WELCOME:
        return this.renderWelcome();
      case INTRO_MODES.LANGUAGE:
        return (
          <LanguageMode onSelectLanguage={this.handleSelectLanguage}/>
        );
      case INTRO_MODES.TIPS:
        return this.renderTips();
      default: return null;
    }
  }
}

WelcomeScreen.propTypes = {
  addLanguage: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    addLanguage: payload => dispatch(addLanguage(payload)),
  };
}

export default connect(null, mapDispatchToProps)(WelcomeScreen);
