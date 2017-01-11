import React, { Component } from 'react';
import { Platform, View, Text, TouchableOpacity, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

export default class PhotoPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUrl: null,
    };

    // this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    console.log(ImagePicker);
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source;

        if (Platform.OS === 'android') {
          source = { uri: response.uri, isStatic: true };
        } else {
          source = { uri: response.uri.replace('file://', ''), isStatic: true };
        }
        this.setState({
          photoUrl: source,
        });
        this.props.handleSubmit(source);
      }
    });
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <View>
            { this.state.photoUrl === null ? <Text>Select a Photo</Text> :
            <Image source={this.state.photoUrl} style={{ height: 150, width: 150 }} />
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
