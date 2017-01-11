import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default function InfoVerification(info, correct, incorrect) {
  const senderName = info.user.firstname + ' ' + info.user.lastname;
  const recipientName = info.recipient.firstname + ' ' + info.recipient.lastname;
  const recipient = info.recipient;

  return (
    <View>
      <Text>Does this look correct?</Text>
      <Text>
        {`From: ${senderName} \nTo: ${recipientName}\n`}
        {`Their address:\n${recipient.address1}\n${recipient.adderess2 || ' '}\n${recipient.city}, ${recipient.state}\n${recipient.zip}\n${recipient.country}`}
      </Text>
      <Button
        title={'No'}
        onPress={() => incorrect()}
      />
      <Button
        title={'Yes'}
        onPress={() => correct()}
      />
    </View>
  );
}
