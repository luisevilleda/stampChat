import React, { Component } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

export default class RecipientInfoGroup extends Component {
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
        >Their name</Text>
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
        >Their Address</Text>
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Address line 1'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ address1: text })}
        />
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Address line 2'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ address2: text })}
        />
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'City'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ city: text })}
        />
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'State'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ state: text })}
        />
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'ZIP code'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ zip: text })}
        />
        <TextInput
          style={{ height: 30, borderWidth: 0.5, borderColor: '#0f0f0f' }}
          placeholder={'Country'}
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={text => this.setState({ coutry: text })}
        />

        <Button
          title={'Submit'}
          onPress={() => this.props.handleSubmit(this.state)}
        />
      </View>
    );
  }
}
