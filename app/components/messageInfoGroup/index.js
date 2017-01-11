import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class MessageInfoGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      front: 'Someone sent you a stampChat!',
      back: 'Learn more about stampChat at stampChat.devify.com',
    };
  }

  render() {
    return (
      <View>
        <Text
          style={{ marginTop: 30 }}
        >Message on Front</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Wish you were here!'}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ front: text });
          }}
        />
        <Text
          style={{ marginTop: 30 }}
        >Message on Back</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Hey, I\'m really enjoying...'}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ back: text });
          }}
        />
        <Button
          title={'Submit'}
          onPress={() => this.props.handleSubmit(this.state)}
        />
      </View>
    );
  }
}
