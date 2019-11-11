import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

import { getCurrentLang, getAllLanguages } from '../redux/selectors';
import { Color, Paddings } from '../constants';
import Wording from '../wording';
import { deleteWord } from '../redux/actions';

import SettingsOption from '../components/Settings/SettingsOption';
import ConfirmButton from '../components/ConfirmButton';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.BLACK(0.05),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    flexGrow: 0,
    flexShrink: 0,
  },
  label: {
    color: Color.BLACK(),
    fontSize: 16,
  },
  labelValue: {
    color: Color.DARK_RASPBERRY,
    fontSize: 16,
  },
  checkSymbol: {
    color: Color.CELADON_GREEN,
    fontSize: 12,
  },
  optionValue: {
    color: Color.BLACK(0.7),
  },
  button: {
    backgroundColor: Color.BLACK(0.1),
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  addButton: {
    marginTop: 4 * Paddings.MEDIUM,
    width: '50%',
  },
});

class SettingsScreen extends React.Component {
  renderItem = ({ item: option }) =>
    (<SettingsOption option={option} onPressOption={this.handlePressOption} />);

  handlePressOption = (option) => {
    console.warn('option', option);
    // TODO: change current language
  }

  keyExtractor = item => item.label;

  getData = () => ([
    {
      label: Wording.settings.current.title,
      value: this.props.currentLanguage,
    },
    {
      label: Wording.settings.listOfLangs.title,
      values: this.props.allLanguages,
    }
  ]);

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.getData()}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          scrollEnabled={false}
        />
        <ConfirmButton
          text={Wording.settings.add.title}
          onPress={() => null}
          containerStyle={styles.addButton}
        />
      </View>
    );
  }
}

SettingsScreen.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  allLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    currentLanguage: getCurrentLang(state),
    allLanguages: getAllLanguages(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteWord: payload => dispatch(deleteWord(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);
