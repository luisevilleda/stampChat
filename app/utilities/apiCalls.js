import base64 from 'base-64';
import { user, key } from './credentials';

const url = `https://${key}:@api.lob.com/v1/postcards`;

module.exports = {
  createPostcard: (photo = 'none', sender, recipient, message) => {
    const cardBody = {
      description: 'Demo Postcard job',
      to: {
        name: `${recipient.firstname} ${recipient.lastname}`,
        address_line1: recipient.address1,
        address_city: recipient.city,
        address_state: recipient.state,
        address_zip: recipient.zip,
      },
      front: '<html style="padding: 1in; font-size: 50;">Somone sent you a stampChat!</html>',
      back: `<html style="padding: 1in; font-size: 20;">${message}</html>`,
      data: {
        name: recipient.firstname,
      },
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(cardBody),
    })
    .then((res) => res.json())
    .then(body => console.log(body));
  },
};
