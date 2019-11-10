import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Color, Paddings, KEYBOARD_VERTICAL_OFFSET } from '../constants';
import Wording from '../wording';
import ConfirmButton from '../components/ConfirmButton';
import { editWord } from '../redux/actions';

const { height } = Dimensions.get('screen');
const IMAGE_HEIGHT = height * 0.5;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: Paddings.DEFAULT,
  },
  imageContainer: {
    width: '100%',
    height: IMAGE_HEIGHT,
    backgroundColor: Color.YELLOW_ORANGE(),
    borderRadius: Paddings.DEFAULT,
    alignItems: 'center',
    justifyContent: 'center',

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: Color.BLACK(),
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    flex: 1,
    width: '100%',
    height: IMAGE_HEIGHT,
    borderRadius: Paddings.DEFAULT,
    overflow: 'hidden',
  },
  input: {
    marginVertical: Paddings.DEFAULT,
    fontSize: 14,
    backgroundColor: Color.BLACK(0.1),
    borderRadius: 4,
    padding: 6,
    width: '100%',
  },
  confirmContainer: {
    marginVertical: 4 * Paddings.DEFAULT,
  },
  label: {
    marginTop: Paddings.DEFAULT,
    color: Color.DARK_RASPBERRY,
    fontSize: 18,
    fontWeight: '400',
  },
});

class EditWordScreen extends Component {
  constructor(props) {
    super(props);

    const { word } = props.navigation.state.params;
    this.state = {
      word,
      source: word.source,
      translation: word.translation,
    };
  }

  handleChangeSource = (source) => {
    this.setState({ source });
  }

  handleChangeTranslation = (translation) => {
    this.setState({ translation });
  }

  handleSave = () => {
    const { word, source, translation } = this.state;

    this.props.editWord({
      id: word.id,
      source,
      translation,
    });
    this.props.navigation.goBack();
  }

  render() {
    const { word } = this.state;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.flex}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <ScrollView style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={word.source}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.label}>{Wording.source}</Text>
            <TextInput
              style={styles.input}
              placeholder={Wording.source}
              value={this.state.source}
              onChangeText={this.handleChangeSource}
              autoCorrect={false}
            />
            <Text style={styles.label}>{Wording.translation}</Text>
            <TextInput
              style={styles.input}
              placeholder={Wording.translation}
              value={this.state.translation}
              onChangeText={this.handleChangeTranslation}
              autoCorrect={false}
            />
            <View style={styles.confirmContainer}>
              <ConfirmButton
                text={Wording.save}
                onPress={this.handleSave}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

EditWordScreen.propTypes = {
  navigation: PropTypes.objectOf({
    state: PropTypes.objectOf({
      params: PropTypes.objectOf({
        word: PropTypes.objectOf({
          id: PropTypes.number,
        })
      })
    })
  }).isRequired,
  editWord: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    editWord: payload => dispatch(editWord(payload)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(EditWordScreen);
