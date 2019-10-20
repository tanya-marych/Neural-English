import ImagePicker from 'react-native-image-picker';
import { Platform } from 'react-native';

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
      
      callback({ path });
    }
  });
}