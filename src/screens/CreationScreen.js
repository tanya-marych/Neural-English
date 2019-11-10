import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-navigation-stack';

import { translate } from '../services/googleTranslationApi';

import {
  MODEL_TYPES,
  loadModel,
  detectObjectWithSSD,
  detectObjectWithYOLO,
  detectObjectWithMOBILE
} from '../services/recognizeService';

import { Color, Paddings } from '../constants';
import WordButton from '../components/WordButton';
import Wording from '../wording';
import ConfirmButton from '../components/ConfirmButton';
import { addWord } from '../redux/actions';
import { CREATION_ROUTES } from '../navigation/CreationNavigation';

const { height } = Dimensions.get('screen');
const IMAGE_HEIGHT = height * 0.5;
const KEYBOARD_VERTICAL_OFFSET = Header.HEIGHT + 40;

class CreationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: MODEL_TYPES.MOBILE,
      source: null,
      recognitions: [],
      selectedWord: null,
    };
  }

  componentDidMount() {
    loadModel(this.state.model);

    const { path } = this.props.navigation.state.params;

    this.setState(
      () => ({ source: { uri: path } }),
      this.detectObjectOnImage,
    );
  }

  setRecognitions = recognitions => {
    this.setState({ recognitions });
  }

  detectObjectOnImage = () => {
    const {uri: path } = this.state.source;

    switch (this.state.model) {
      case MODEL_TYPES.SSD:
        detectObjectWithSSD(path, this.setRecognitions);
        break;

      case MODEL_TYPES.YOLO:
        detectObjectWithYOLO(path, this.setRecognitions);
        break;

      default:
        detectObjectWithMOBILE(path, this.setRecognitions);
    }
  }

  handleTranslate = async () => {
    if (this.state.selectedWord || this.textInput) {
      this.props.addWord({
        url: this.state.source.uri,
        source: this.state.selectedWord || this.textInput,
        translation: this.state.selectedWord || this.textInput,
      });
      this.setState({
        selectedWord: null,
        source: null,
        recognitions: [],
      });
      this.textInput = null;
      this.props.navigation.navigate(CREATION_ROUTES.SELECT_CREATION_TYPE);
    }
  }

  textInput = null;

  handleChangeInput = (word) => {
    this.textInput = word;
  }

  handlePressWord = (selectedWord) => {
    this.setState({ selectedWord });
  }

  renderDescription = () => this.state.recognitions && this.state.recognitions.length
    ? (
      <View style={styles.descriptionContainer}>
        <Text style={styles.selectWord}>{Wording.selectWord}</Text>
        <View style={styles.wordsContainer}>
          {this.state.recognitions.map((res, id) => (
            <WordButton
              key={id}
              text={res.label}
              onPress={this.handlePressWord}
            />
          ))}
        </View>
        <Text style={styles.selectWord}>{Wording.or}</Text>
        <TextInput
          style={styles.input}
          placeholder={Wording.addWord}
          onChangeText={this.handleChangeInput}
          autoCorrect={false}
        />
        <View style={styles.confirmContainer}>
          <ConfirmButton
            text={Wording.addToLearning}
            onPress={this.handleTranslate}
          />
        </View>
      </View>)
    : null;

  render() {
    const { source } = this.state;

    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.flex}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <ScrollView style={styles.flex}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {source
                ? (
                  <Image
                    source={source}
                    style={styles.image}
                    resizeMode="cover"
                  />)
                : null
              }
            </View>
            {this.renderDescription()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

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
  text: {
    color: Color.WHITE(),
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionContainer: {
    marginTop: 2 * Paddings.DEFAULT,
    paddingHorizontal: 4 * Paddings.DEFAULT,
    width: '100%',
    alignItems: 'center',
  },
  wordsContainer: {
    marginVertical: Paddings.DEFAULT,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectWord: {
    fontSize: 12,
    fontWeight: '400',
    color: Color.BLACK(0.5),
    letterSpacing: 0.3,
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
});

function mapDispatchToProps(dispatch) {
  return {
    addWord: payload => dispatch(addWord(payload)),
  };
}

export default connect(
  null,
  mapDispatchToProps,
)(CreationScreen);