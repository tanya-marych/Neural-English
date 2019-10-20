import React, { Component } from 'react';
import { Platform, StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import { translate } from '../services/googleTranslationApi';
import {
  MODEL_TYPES,
  loadModel,
  detectObjectWithSSD,
  detectObjectWithYOLO,
  detectObjectWithMOBILE
} from '../services/recognizeService';

const height = 350;
const width = 350;
const blue = "#25d5fd";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: null,
      source: null,
      imageHeight: height,
      imageWidth: width,
      recognitions: []
    };
  }

  onSelectModel(model) {
    this.setState({ model });
    loadModel(model);
  }

  setRecognitions = recognitions => {
    console.warn('recognitions', recognitions);
    this.setState({ recognitions });
  }

  onSelectImage = () => {
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
        var w = response.width;
        var h = response.height;
        this.setState({
          source: { uri: path },
          imageHeight: h * width / w,
          imageWidth: width
        });

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
    });
  }

  renderResults = () => this.state.recognitions.map((res, id) => (
    <Text key={id} style={{ color: 'black' }}>
      {res["label"] + "-" + (res["confidence"] * 100).toFixed(0) + "%"}
    </Text>
  ));

  handleTranslate = async () => {
    console.warn('1');
    const res = await translate();

    console.warn("res", res);
  }

  render() {
    const { model, source, imageHeight, imageWidth } = this.state;
    var renderButton = (m) => {
      return (
        <TouchableOpacity style={styles.button} onPress={this.onSelectModel.bind(this, m)}>
          <Text style={styles.buttonText}>{m}</Text>
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.handleTranslate}>
          <Text>test</Text>
        </TouchableOpacity>
        {model ?
          <TouchableOpacity style={
            [styles.imageContainer, {
              height: imageHeight,
              width: imageWidth,
              borderWidth: source ? 0 : 2
            }]} onPress={this.onSelectImage.bind(this)}>
            {
              source ?
                <Image source={source} style={{
                  height: imageHeight, width: imageWidth
                }} resizeMode="contain" /> :
                <Text style={styles.text}>Select Picture</Text>
            }
            <View>
              {this.renderResults()}
            </View>
          </TouchableOpacity>
          :
          <View>
            {renderButton(MODEL_TYPES.MOBILE)}
            {renderButton(MODEL_TYPES.SSD)}
            {renderButton(MODEL_TYPES.YOLO)}
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  imageContainer: {
    borderColor: blue,
    borderRadius: 5,
    alignItems: "center"
  },
  text: {
    color: blue
  },
  button: {
    width: 200,
    backgroundColor: blue,
    borderRadius: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 15
  },
  box: {
    position: 'absolute',
    borderColor: blue,
    borderWidth: 2,
  },
  boxes: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  }
});
