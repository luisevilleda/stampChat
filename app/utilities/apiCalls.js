import { APIKEY } from './credentials';
import Lob('APIKEY') from 'lob';

export default {
  postPostcard: (photo, message, sender, recipient) => {
    fetch('https:api.lob.com/v1/postcards', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },

    });
  },

};
