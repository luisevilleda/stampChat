import React, { Component } from 'react';
import { Navigator, View, Text } from 'react-native';
import UserInputGroup from '../userInputGroup';
import RecipientInfoGroup from '../recipientInfoGroup';
import MessageInfoGroup from '../messageInfoGroup';
import Logo from '../logo';
import PhotoPicker from '../photoPicker';
import InfoVerification from '../infoVerification';
import { createPostcard } from '../../utilities/apiCalls';

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
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        country: '',
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
      createPostcard(this.state.photoUrl);
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

  handleCorrectInfo(navigator) {
    createPostcard(this.state.photoUrl, this.state.user, this.state.recipient, this.state.message);

  }

  handleIncorrectInfo(navigator) {
    navigator.push({ name: 'user' });
  }

  renderScene(route, navigator) {
    if (route.name === 'user') {
      return (
        <View>
        { InfoVerification(this.state, () => this.handleCorrectInfo(navigator), () => this.handleIncorrectInfo(navigator)) }

          { Logo(50, 80) }
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
          { InfoVerification(this.state, () => this.handleCorrectInfo(navigator), () => this.handleIncorrectInfo(navigator)) }
        </View>
      );
    }
    return (
      <Text>Oops, there seems to be a problem!</Text>
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
