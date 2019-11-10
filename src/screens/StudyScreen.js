import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';

import { getWordsInProgress } from '../redux/selectors';
import { Paddings, Color, KEYBOARD_VERTICAL_OFFSET } from '../constants';
import SelectWord from '../components/Learning/SelectWord';
import ConfirmButton from '../components/ConfirmButton';
import Wording from '../wording';
import { sendLearnedWords } from '../redux/actions';

const { width } = Dimensions.get('screen');

const IMAGE_SIZE = 0.75 * width;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageContainer: {
    margin: Paddings.DEFAULT,
    marginTop: 15,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: Color.WHITE(),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    shadowColor: Color.BLACK(),
    borderRadius: Paddings.HALF_DEFAULT,
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: Paddings.HALF_DEFAULT,
    overflow: 'hidden',
  },
  imageDescription: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: IMAGE_SIZE,
    height: 50,
    backgroundColor: Color.BLACK(0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    margin: Paddings.DEFAULT,
    width: IMAGE_SIZE,
    flex: 1,
  },
  label: {
    color: Color.BLACK(0.5),
    fontSize: 14,
  },
  source: {
    color: Color.YELLOW_ORANGE(),
    fontSize: 24,
    fontWeight: 'bold',
  },
  nextButtonContainer: {
    marginTop: 20,
  },
});

class StudyScreen extends React.Component {
  state = {
    currentIndex: 0,
    learnedWords: [],
    selectedFromOptionsId: null,
  }

  handlePressSelect = (selectedWord) => {
    if (!this.state.selectedFromOptionsId) {
      const currentIndexWord = this.props.progressWords[this.state.currentIndex];
    
      this.setState(prevState => ({
        learnedWords: [
          ...prevState.learnedWords,
          {
            id: selectedWord.id,
            isCorrect: currentIndexWord.id === selectedWord.id,
          },
        ],
        selectedFromOptionsId: selectedWord.id,
      }));
    }
  }

  isLastWord = () => this.state.currentIndex === (this.props.progressWords.length - 1);

  handlePressNext = () => {
    if (this.state.selectedFromOptionsId) {
      const isLastWord = this.isLastWord();

      if (isLastWord) {
        this.props.saveAllData({
          learnedWords: this.state.learnedWords,
        });

        this.setState({
          learnedWords: [],
          selectedFromOptionsId: null,
          currentIndex: 0,
        });

        this.props.navigation.goBack();

        return;
      }

      this.setState(prevState => ({
        currentIndex: prevState.currentIndex + 1,
        selectedFromOptionsId: null,
      }));
    }
  }

  renderSelectFrom = () => {
    const word = this.props.progressWords[this.state.currentIndex];
    const { selectedFromOptionsId } = this.state;

    return (
      <View style={styles.textContainer} key={this.state.currentIndex}>
        {word.selectFrom.map((item) => {
          const showCorrect = selectedFromOptionsId && item.id === word.id;
          const showWrong = selectedFromOptionsId
            && selectedFromOptionsId !== word.id
            && selectedFromOptionsId === item.id;

          return (
            <SelectWord
              key={item.id}
              word={item}
              onPress={this.handlePressSelect}
              isCorrect={showCorrect}
              isWrong={showWrong}
            />
          );
        })}
        <View style={styles.nextButtonContainer}>
          <ConfirmButton
            onPress={this.handlePressNext}
            text={this.isLastWord() ? Wording.finish : Wording.next}
            />
        </View>
      </View>
    );
  }

  renderCurrentWord = () => {
    const word = this.props.progressWords[this.state.currentIndex];

    return (
      <Fragment>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: word.url }}
            style={styles.image}
          />
          <View style={styles.imageDescription}>
            <Text style={styles.source}>{word.source}</Text>
          </View>
        </View>
        {this.renderSelectFrom()}
      </Fragment>
    );
  }

  keyExtractor = item => item.id;

  render() {
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.flex}
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
      >
        <ScrollView style={styles.flex}>
          <View style={styles.container}>
            {this.props.progressWords.length
              ? this.renderCurrentWord()
              : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

StudyScreen.propTypes = {
  progressWords: PropTypes.arrayOf({
    id: PropTypes.number,
  }).isRequired,
  saveAllData: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf({
    goBack: PropTypes.func,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    progressWords: getWordsInProgress(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    saveAllData: payload => dispatch(sendLearnedWords(payload)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudyScreen);
