import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Paddings, Color } from '../../constants';

const styles = StyleSheet.create({
  selectContainer: {
    width: '100%',
    paddingVertical: Paddings.MEDIUM,
    marginVertical: Paddings.HALF_DEFAULT,
    borderColor: Color.YELLOW_ORANGE(),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  correctSelect: {
    borderColor: Color.CELADON_GREEN,
  },
  wrongSelect: {
    borderColor: Color.RED,
  },
  translation: {
    color: Color.YELLOW_ORANGE(),
    fontSize: 18,
    fontWeight: '500',
  },
  correctTranslation: {
    color: Color.CELADON_GREEN,
  },
  wrongTranslation: {
    color: Color.RED,
  },
});

class SelectWord extends PureComponent {
  handlePress = () => {
    this.props.onPress(this.props.word);
  }

  render() {
    const { word, isCorrect, isWrong } = this.props;

    return (
      <TouchableOpacity key={word.id} onPress={this.handlePress}>
        <View style={[
          styles.selectContainer,
          isCorrect && styles.correctSelect,
          isWrong && styles.wrongSelect,
        ]}>
          <Text style={[
            styles.translation,
            isCorrect && styles.correctTranslation,
            isWrong && styles.wrongTranslation,
          ]}>
            {word.translation}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

SelectWord.propTypes = {
  word: PropTypes.objectOf({
    id: PropTypes.number,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
  isCorrect: PropTypes.bool,
  isWrong: PropTypes.bool,
}

SelectWord.defaultProps = {
  isCorrect: false,
  isWrong: false,
}

export default SelectWord;
