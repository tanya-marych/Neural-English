import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Header } from 'react-navigation-stack';
import { BlurView } from '@react-native-community/blur';
import PropTypes from 'prop-types';

import { getWords } from '../redux/selectors';
import { Paddings, Color } from '../constants';
import Wording from '../wording';
import { LEARING_ROUTES } from '../navigation/LearningNavigation';
import ConfirmButton from '../components/ConfirmButton';
import { deleteWord } from '../redux/actions';
import { HeaderButton } from '../components/Navigation/Header';

const COLUMNS = 2;
const { width, height } = Dimensions.get('screen');

// margins and paddings
const COLUMN_SIZE = (width - 2 * Paddings.DEFAULT) / COLUMNS;
const CONTAINER_MARGIN = Paddings.HALF_DEFAULT;
const IMAGE_CONTAINER_SIZE = COLUMN_SIZE - 2 * CONTAINER_MARGIN;
const IMAGE_SIZE = IMAGE_CONTAINER_SIZE - 2 * Paddings.DEFAULT;
const OVERLAY_SIZE = 0.75 * width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingHorizontal: Paddings.DEFAULT,
    paddingTop: Paddings.DEFAULT,
  },
  imageContainer: {
    padding: Paddings.DEFAULT,
    margin: CONTAINER_MARGIN,
    width: IMAGE_CONTAINER_SIZE,
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
    marginBottom: Paddings.DEFAULT,
  },
  textContainer: {
  },
  label: {
    color: Color.BLACK(0.5),
    fontSize: 14,
  },
  source: {
    color: Color.YELLOW_ORANGE(),
    fontSize: 14,
    fontWeight: '400',
  },
  translation: {
    color: Color.DARK_RASPBERRY,
    fontSize: 14,
    fontWeight: '400',
  },
  studied: {
    color: Color.BLACK(0.5),
    fontSize: 14,
    fontWeight: '400',
  },
  correct: {
    color: Color.CELADON_GREEN,
    fontSize: 14,
    fontWeight: '400',
  },
  overlay: {
    width,
    height: height - Header.HEIGHT,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlayImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayImage: {
    width: OVERLAY_SIZE,
    height: OVERLAY_SIZE,
    borderRadius: Paddings.DEFAULT,
  },
  button: {
    backgroundColor: Color.BLACK(0.5),
  },
  buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});

class DictionaryScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: Wording.dictionary,
    headerRight: (
      <HeaderButton
        title={Wording.study}
        onPress={navigation.getParam('onRightPress')}
      />
    ),
  });

  openStudy = () => {
    if (this.props.words.length > 5) {
      this.props.navigation.navigate(LEARING_ROUTES.STUDY);
    } else {
      Alert.alert(Wording.sorry, Wording.notEnoughWords);
    }
    
  }

  componentDidMount() {
    this.props.navigation.setParams({
      'onRightPress': this.openStudy,
    });
  }

  state = {
    selected: null,
  }

  toggleLargeMode = (selected = null) => {
    this.setState({ selected });
  }

  deleteWord = () => {
    this.props.deleteWord({ id: this.state.selected.id });
    this.toggleLargeMode(null);
  }

  confirmDeleteWord = () => {
    Alert.alert(
      Wording.deleteTitle,
      Wording.deleteText,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: this.deleteWord },
      ],
      {cancelable: false},
    );
  }

  editWord = () => {
    this.toggleLargeMode(null);
    this.props.navigation.navigate(
      LEARING_ROUTES.EDIT_WORD,
      { word: this.state.selected },
    );
  }

  renderItem = ({ item: word }) => (
    <TouchableOpacity onPress={() => this.toggleLargeMode(word)}>
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: word.url }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text>
            <Text style={styles.source}>{Wording.original}</Text>
            <Text style={styles.source}>{word.source}</Text>
          </Text>
          <Text>
            <Text style={styles.translation}>{Wording.translated}</Text>
            <Text style={styles.translation}>{word.translation}</Text>
          </Text>
          <Text>
            <Text style={styles.correct}>{Wording.correctStudied}</Text>
            <Text style={styles.correct}>{word.study.correct}</Text>
          </Text>
          <Text>
            <Text style={styles.studied}>{Wording.studied}</Text>
            <Text style={styles.studied}>{word.study.amount}</Text>
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  keyExtractor = item => item.id;

  renderOverlay = () => this.state.selected
    ? (
      <TouchableOpacity style={styles.overlay} onPress={() => this.toggleLargeMode(null)}>
        <BlurView
          style={styles.overlayImageContainer}
          blurType='light'
          blurAmount={3}
        >
          <Image
            source={{ uri: this.state.selected.url }}
            style={styles.overlayImage}
          />
          <View style={styles.buttons}>
            <ConfirmButton
              containerStyle={styles.button}
              text={Wording.edit}
              onPress={this.editWord}
            />
            <ConfirmButton
              containerStyle={styles.button}
              text={Wording.delete}
              onPress={this.confirmDeleteWord}
            />
          </View>
        </BlurView>
      </TouchableOpacity>
    ) : null;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={this.props.words}
          numColumns={COLUMNS}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
        {this.renderOverlay()}
      </View>
    );
  }
}

DictionaryScreen.propTypes = {
  words: PropTypes.arrayOf({
    id: PropTypes.number,
  }).isRequired,
  deleteWord: PropTypes.func.isRequired,
  navigation: PropTypes.objectOf({
    navigate: PropTypes.func,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    words: getWords(state),
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
)(DictionaryScreen);
