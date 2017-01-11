import React, { Component } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

export default class UserInputGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
    };
  }

  render() {
    return (
      <View>
        <Text
          style={{ marginTop: 30 }}
        >Your name</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Firstname'}
          autoCorrect={false}
          onChangeText={text => this.setState({ firstname: text })}
        />

        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Lastname'}
          autoCorrect={false}
          onChangeText={text => this.setState({ lastname: text })}
        />

        <Text
          style={{ marginTop: 8 }}
        >Your email</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'example@gmail.com'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ email: text })}
        />
        <Button
          title={'Submit'}
          onPress={() => this.props.handleSubmit(this.state)}
        />
      </View>
    );
  }
}
