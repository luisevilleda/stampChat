import React, { Component } from 'react';
import { Navigator, View, Text } from 'react-native';
import UserInputGroup from '../userInputGroup';
import RecipientInfoGroup from '../recipientInfoGroup';
import MessageInfoGroup from '../messageInfoGroup';
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
      photo: '',
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
      navigator.push({ name: 'recipient' });
    });
  }

  handlePhotoUrlSubmit(photoUrl) {
    this.setState({ photoUrl }, () => {
      console.log(this.state);
    });
  }

  handleRecipientInfoGroupSubmit(recipient, navigator) {
    this.setState({ recipient }, () => {
      navigator.push({ name: 'craft' });
    });
  }

  handleMessageInfoGroupSubmit(message, navigator) {
    this.setState({ message }, () => navigator.push({ name: 'send' }));
  }

  renderScene(route, navigator) {
    if (route.name === 'user') {
      return (
        <View>
          {Logo(50, 80)}
          <Text>Who is the stampChat from?</Text>
          <UserInputGroup
            handleSubmit={userInfo =>
              this.handleUserInputGroupSubmit(userInfo, navigator)
            }
          />
        </View>
      );
    }

    if (route.name === 'recipient') {
      return (
        <View>
          <Text>Who is the stampChat for?</Text>
          <RecipientInfoGroup
            handleSubmit={recipientInfo =>
              this.handleRecipientInfoGroupSubmit(recipientInfo, navigator)
            }
          />
        </View>
      );
    }

    if (route.name === 'craft') {
      return (
        <View>
          <Text>Craft your stampChat card!</Text>
          <PhotoPicker handleSubmit={photoUrl => this.handlePhotoUrlSubmit(photoUrl)} />
          <MessageInfoGroup
            handleSubmit={
              messageInfo => this.handleMessageInfoGroupSubmit(messageInfo, navigator)
            }
          />
        </View>
      );
    }

    if (route.name === 'send') {
      return (
        <View>
          <Text>Send screen</Text>
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
        initialRoute={{ name: 'user' }}
        renderScene={this.renderScene}
        style={{ padding: 50 }}
      />
    );
  }
}
