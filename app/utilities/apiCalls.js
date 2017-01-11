import base64 from 'base-64';
import { user, key } from './credentials';

const url = `https://${key}:@api.lob.com/v1/postcards`;

module.exports = {
  createPostcard: (photo = 'none', sender, recipient, message) => {
    const cardBody = {
      description: 'Demo Postcard job',
      to: {
        name: 'Joe Smith',
        address_line1: '123 Main Street',
        address_city: 'Mountain View',
        address_state: 'CA',
        address_zip: '94041',
      },
      front: '<html style="padding: 1in; font-size: 50;">Front HTML for {{name}}</html>',
      back: '<html style="padding: 1in; font-size: 20;">Back HTML for {{name}}</html>',
      data: {
        name: 'Harry',
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
