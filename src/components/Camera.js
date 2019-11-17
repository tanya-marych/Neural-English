
import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { RNCamera } from 'react-native-camera';

import { Color } from '../constants';

import Close from '../images/close.png';

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  captureContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 75,
    height: 75,
    borderRadius: 20,
    backgroundColor: Color.OLD_BURGUNGY,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowColor: Color.BLACK(),
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonIn: {
    width: 25,
    height: 25,
    borderRadius: 10,
    backgroundColor: Color.YELLOW_ORANGE(),
  },
  spinner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
    backgroundColor: Color.BLACK(0.3),
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    opacity: 0.7,
    width: 40,
    height: 40,
  },
});

class Camera extends React.PureComponent {
  state = {
    loading: false,
  }

  takePicture = async () => {
    try {
      this.setState({ loading: true });
      const data = await this.camera.takePictureAsync();

      await this.props.onTakePicture(data.uri);
      this.setState({ loading: false });
    } catch (err) {
      console.log('err: ', err);
    }
  }

  camera = null;

  handleCameraRef = cam => this.camera = cam;

  renderCloseButton = () => (
    <TouchableOpacity
      onPress={this.props.closeCamera}
      style={styles.closeButtonContainer}
    >
      <Image source={Close} style={styles.closeButton} />
    </TouchableOpacity>
  )

  render() {
    return (
      <Modal visible={this.props.enabled} transparent>
        <RNCamera
          ref={this.handleCameraRef}
          style={styles.captureContainer}
        >
          {this.renderCloseButton()}
          <TouchableOpacity onPress={this.takePicture}>
            <View style={styles.button}>
              <View style={styles.buttonIn} />
            </View>
          </TouchableOpacity>
        </RNCamera>
        {this.state.loading
          ? <ActivityIndicator
              color={Color.YELLOW_ORANGE()}
              size="large"
              style={styles.spinner}
            />
          : null}
      </Modal>
    )
  }
}

export default Camera;