import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View, Picker, Text } from 'react-native';
import PropTypes from 'prop-types';

import { getCurrentLang, getAllLanguages } from '../redux/selectors';
import { Color, Paddings } from '../constants';
import Wording from '../wording';

import SettingsOption from '../components/Settings/SettingsOption';
import ConfirmButton from '../components/ConfirmButton';
import { setCurrentLanguage, addLanguage, deleteLanguage } from '../redux/actions';
import { SUPPORTED_LANGUAGES_ARRAY } from '../redux/constants';
import Overlay from '../components/Overlay';

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
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
  },
  overlayTitle: {
    color: Color.BLACK(),
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    marginTop: 4 * Paddings.MEDIUM,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

const WORD_ACTIONS = {
  DELETE: 'Delete',
  ADD: 'Add',
};

const LanguageOverlay = ({
  onPress,
  onConfirm,
  pickerValues,
  confirmText,
}) => {
  const [ selectedLan, setLan ] = useState(pickerValues[0]);

  return (
    <Overlay
      visible
      onPress={onPress}
    >
      <Fragment>
        <Text style={styles.overlayTitle}>{Wording.selectLanguages}</Text>
        <Picker
          selectedValue={selectedLan}
          style={styles.picker}
          onValueChange={setLan}>
            {pickerValues.map(lan => (
              <Picker.Item key={lan} label={Wording.languages[lan]} value={lan} />
            ))}
        </Picker>
        <ConfirmButton
          text={confirmText}
          onPress={() => onConfirm(selectedLan)}
          containerStyle={styles.addButton}
        />
      </Fragment>
    </Overlay>
  );
}

LanguageOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
  onConfirm: PropTypes.bool.isRequired,
  pickerValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  confirmText: PropTypes.string.isRequired,
}

class SettingsScreen extends React.Component {
  state = {
    showModal: false,
    wordAction: null,
    pickerValues: [],
  }

  renderItem = ({ item: option }) =>
    (<SettingsOption
      option={option}
      onPressOption={this.handlePressOption}
      selectedOption={this.props.currentLanguage}
    />);

  handlePressOption = (language) => {
    this.props.setCurrentLanguage({ language });
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

  toggleLanguagesModal = () =>
    this.setState(prevState => ({ showModal: !prevState.showModal }));

  handleConfirm = (language) => {
    let action = this.state.wordAction === WORD_ACTIONS.ADD
      ? this.props.addLanguage
      : this.props.deleteLanguage;

    action({ language });
    this.setState({
      wordAction: null,
      pickerValues: [],
    }, this.toggleLanguagesModal);
  };

  showAddLangButton = () =>
    this.props.allLanguages.length !== SUPPORTED_LANGUAGES_ARRAY.length;

  showDeleteLangButton = () => this.props.allLanguages.length !== 1;

  handleAddLang = () => {
    this.setState({
      wordAction: WORD_ACTIONS.ADD,
      pickerValues: SUPPORTED_LANGUAGES_ARRAY
        .filter(lan => !this.props.allLanguages.includes(lan)),
    }, this.toggleLanguagesModal);
  }

  handleDeleteLang = () => {
    this.setState({
      wordAction: WORD_ACTIONS.DELETE,
      pickerValues: SUPPORTED_LANGUAGES_ARRAY
        .filter(lan => this.props.allLanguages.includes(lan)),
    }, this.toggleLanguagesModal);
  }

  getConfirmText = () => this.state.wordAction === WORD_ACTIONS.ADD
    ? Wording.settings.add.title
    : Wording.settings.delete.title;

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
        <View style={styles.buttonsContainer}>
        {this.showAddLangButton() ? (
          <ConfirmButton
            text={Wording.settings.add.title}
            onPress={this.handleAddLang}
          />) : null}
        {this.showDeleteLangButton() ? (
          <ConfirmButton
            text={Wording.settings.delete.title}
            onPress={this.handleDeleteLang}
          />) : null}
        </View>
        
      {this.state.showModal ? (
        <LanguageOverlay
          visible={this.state.showModal}
          onPress={this.toggleLanguagesModal}
          onConfirm={this.handleConfirm}
          confirmText={this.getConfirmText()}
          pickerValues={this.state.pickerValues}
        />) : null}
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
  setCurrentLanguage: PropTypes.func.isRequired,
  addLanguage: PropTypes.func.isRequired,
  deleteLanguage: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currentLanguage: getCurrentLang(state),
    allLanguages: getAllLanguages(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentLanguage: payload => dispatch(setCurrentLanguage(payload)),
    addLanguage: payload => dispatch(addLanguage(payload)),
    deleteLanguage: payload => dispatch(deleteLanguage(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsScreen);
