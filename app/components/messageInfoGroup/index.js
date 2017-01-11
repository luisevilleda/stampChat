import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default class MessageInfoGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  render() {
    return (
      <View>
        <Text
          style={{ marginTop: 30 }}
        >Message</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Wish you were here!'}
          autoCorrect={false}
          onChangeText={(text) => {
            this.setState({ message: text });
          }}
        />
        <Button
          title={'Submit'}
          onPress={() => this.props.handleSubmit(this.state.message)}
        />
      </View>
    );
  }
}
