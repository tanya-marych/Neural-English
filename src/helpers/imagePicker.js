import ImagePicker from 'react-native-image-picker';
import { Platform, Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export const selectImageFromLibrary = (callback) => {
  ImagePicker.launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      var path = Platform.OS === 'ios' ? response.uri : 'file://' + response.path;
      
      callback(path);
    }
  });
}

const getDir = () => `${RNFetchBlob.fs.dirs.DocumentDir}/NeuralEnglish`;

const getDestination = (name) => `${getDir()}/${name}`;

export const saveToSpecificFolder = async (path) => {
  try {
    const exists = await RNFetchBlob.fs.exists(getDir());

    if (!exists) {
      await RNFetchBlob.fs.mkdir(getDir());
    }

    const filename = path.split('/').slice().pop();
    const sourcePath = path.split('///').pop();
    const dest = getDestination(filename);
    
    await RNFetchBlob.fs.cp(sourcePath, dest);

    return dest;
  } catch(err) {
    Alert.alert(err.message);
    console.warn('err', err.message);
  }
};
