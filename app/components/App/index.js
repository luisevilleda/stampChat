import React, { Component } from 'react';
import { Navigator, ScrollView, View, Text, Image } from 'react-native';
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
        <ScrollView>
        <Image
          source={{ uri:'https://s3-us-west-2.amazonaws.com/assets.lob.com/psc_c58b91606b032252_thumb_large_1.png?AWSAccessKeyId=AKIAJCFUUY3W2HE7FMBQ&Expires=1486711647&Signature=aLjMvZpJQJojJDNv6%2BE%2FjMyOgos%3D'}}
          style={{ height: 100, width: 100 }}
        />
        { InfoVerification(this.state, () => this.handleCorrectInfo(navigator), () => this.handleIncorrectInfo(navigator)) }

          { Logo(50, 80) }
          <Text>Who is the stampChat from?</Text>
          <UserInputGroup
            handleSubmit={userInfo =>
              this.handleUserInputGroupSubmit(userInfo, navigator)
            }
          />
        </ScrollView>
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
