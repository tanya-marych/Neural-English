import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';

import { selectImageFromLibrary } from '../helpers/imagePicker';

import { Color, Paddings } from '../constants';
import { CREATION_ROUTES } from '../navigation/CreationNavigation';
import Wording from '../wording';
import Camera from '../components/Camera';

class SelectCreationTypeScreen extends PureComponent {
  static navigationOptions = {
    title: Wording.creation,
  }

  state = {
    showCamera: false,
  }

  toggleCamera = () =>
    this.setState(prevState => ({ showCamera: !prevState.showCamera }));

  onSelectImage = () => selectImageFromLibrary(path => {
    this.props.navigation.navigate(CREATION_ROUTES.CREATION, { path });
  });

  handleTakeCameraPicture = (path) => {
    this.props.navigation.navigate(CREATION_ROUTES.CREATION, { path });
    InteractionManager.runAfterInteractions(this.toggleCamera);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, styles.selectPictureContainer]}
          onPress={this.onSelectImage}
        >
          <Text style={styles.text}>{Wording.selectPicture}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cameraPictureContainer]}
          onPress={this.toggleCamera}
        >
          <Text style={styles.text}>{Wording.createFromCamera}</Text>
        </TouchableOpacity>
        <Camera
          onTakePicture={this.handleTakeCameraPicture}
          enabled={this.state.showCamera}
          closeCamera={this.toggleCamera}
        />
      </View>
    );
  }
}

SelectCreationTypeScreen.propTypes = {
  navigation: PropTypes.objectOf({
    state: PropTypes.objectOf({
      params: PropTypes.objectOf({
        word: PropTypes.objectOf({
          id: PropTypes.number,
        })
      })
    })
  }).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: Paddings.DEFAULT,
  },
  button: {
    flex: 1,
    width: '100%',
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
    margin: Paddings.DEFAULT,
  },
  selectPictureContainer: {
    backgroundColor: Color.YELLOW_ORANGE(),
  },
  cameraPictureContainer: {
    backgroundColor: Color.BLACK(0.5),
  },
  text: {
    color: Color.WHITE(),
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SelectCreationTypeScreen;