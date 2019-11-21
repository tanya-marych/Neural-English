import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  InteractionManager,
  ActivityIndicator,
} from 'react-native';

import {
  selectImageFromLibrary,
  saveToSpecificFolder,
} from '../helpers/imagePicker';

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
    showSpinner: false,
  }

  toggleCamera = () =>
    this.setState(prevState => ({ showCamera: !prevState.showCamera, showSpinner: false }));

  onSelectImage = async () => {
    this.setState({ showSpinner: true });
    await selectImageFromLibrary(async (path) => {
      const updatedPath = await saveToSpecificFolder(path);
      this.props.navigation.navigate(CREATION_ROUTES.CREATION, { path: updatedPath });
      this.setState({ showSpinner: false });
    });
  }

  handleTakeCameraPicture = async (path) => {
    this.setState({ showSpinner: true });
    const updatedPath = await saveToSpecificFolder(path);
    this.props.navigation.navigate(CREATION_ROUTES.CREATION, { path: updatedPath });
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
        {this.state.showSpinner
          ? (
            <View style={styles.spinnerContainer}>
              <ActivityIndicator />
            </View>
          ) : null}
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
  spinnerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default SelectCreationTypeScreen;