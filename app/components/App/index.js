import React, { Component } from 'react';
import { Navigator, View, Text } from 'react-native';
import UserInputGroup from '../userInputGroup';
import Logo from '../logo';
import PhotoPicker from '../photoPicker';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfoSubmitted: false,
      user: {
        firstname: '',
        lastname: '',
        email: '',
      },
      recipient: {
        firstname: '',
        lastname: '',
        recipientAddress: {
          address1: '',
          address2: '',
          city: '',
          state: '',
          zip: '',
          country: '',
        },
      },
      photo: 'url',
      message: '',
    };
    this.renderScene = this.renderScene.bind(this);
  }

  handleUserInputGroupSubmit(userInfo, navigator) {
    this.setState({
      user: userInfo,
      userInfoSubmitted: true,
    }, () => {
      console.log(this.state);
      navigator.push({ name: 'upload' });
    });
  }

  renderScene(route, navigator) {
    if (route.name === 'login') {
      return (
        <View>
          <Logo />
          <UserInputGroup
            handleSubmit={userInfo => this.handleUserInputGroupSubmit(userInfo, navigator)}
          />
        </View>
      );
    }

    if (route.name === 'upload') {
      return (
        <View>
          <PhotoPicker />
          <Text>Upload page under construction</Text>
        </View>
      );
    }
    return (
      <Text>Oops</Text>
    );
  }

  render() {
    return (
      <Navigator
        initialRoute={{ name: 'login' }}
        renderScene={this.renderScene}
        style={{ padding: 50 }}
      />
    );
  }
}
