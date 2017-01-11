import React, { Component } from 'react';
import { Linking, Navigator, ScrollView, Button, View, Text, Image } from 'react-native';
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
        firstname: 'Luis',
        lastname: 'Villeda',
        email: 'luisevilleda@gmail.com',
      },
      recipient: {
        firstname: 'Aaron',
        lastname: 'Abbott',
        address1: '1234 Sample Rd',
        city: 'Larkspur',
        state: 'CA',
        zip: '94939',
        country: 'USA',
      },
      photo: 'url',
      card: {
        front: 'Wish you were here!',
        back: 'I\'m really liking Mill Valley. Next time you must come with me!',
      },
      lobCard: {
        pdf: '',
        front: '',
        back: '',
        carrier: '',
        expectedDeliveryDate: '',
      },
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

  handleMessageInfoGroupSubmit(card, navigator) {
    this.setState({ card }, () => navigator.push({ name: 'send' }));
  }

  handleCorrectInfo(navigator) {
    createPostcard(this.state.photoUrl, this.state.user, this.state.recipient, this.state.card.front, this.state.card.back)
    .then((res) => {
      console.log(res);

      const toDataURL = url => fetch(url)
      .then(response => response.blob())
      .then(blob => new Promise((resolve, reject) => {
        console.log('BLOB ', blob);
          var reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      }));

      toDataURL(res.thumbnails[0].small)
        .then(result => console.log('AARON: ', result))
        .catch(error => console.error(error));


      this.setState({
        lobCard: {
          pdf: res.url,
          front: res.thumbnails[0].small,
          back: res.thumbnails[1].small,
          carrier: res.carrier,
          expectedDeliveryDate: res.expected_delivery_date,
        },
      }, () => {
        return navigator.push({ name: 'response' });
      });
    });
  }

  handleIncorrectInfo(navigator) {
    navigator.push({ name: 'user' });
  }

  renderScene(route, navigator) {
    if (route.name === 'user') {
      return (
        <ScrollView>
          { Logo(70, 100) }
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
          { Logo(70, 100) }
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
          { Logo(70, 100) }
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

    if (route.name === 'response') {
      return (
        <View>
          {Linking.openURL(this.state.lobCard.pdf)
            .catch(err => console.error('An error occurred', err))
          }
          <Text>Here is you postcard!</Text>
          <Button onPress={() => {
            Linking.openURL(this.state.lobCard.pdf)
            .catch(err => console.error('An error occurred', err));
            }}
            title={'View postcard'}
          />
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
