import Promise from 'bluebird';
import { key } from './credentials';

const url = `https://${key}:@api.lob.com/v1/postcards`;

const sampleData = {
  photoUrl: 'url',
  sender: {
    firstname: 'Luis',
    lastname: 'Villeda',
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
  message: 'Wish you were here!',
};

export function createPostcard(photoUrl, sender, recipient, front, back) {
    return new Promise((resolve) => {
      const cardBody = {
        description: 'Demo Postcard job',
        to: {
          name: `${recipient.firstname} ${recipient.lastname}`,
          address_line1: recipient.address1,
          address_city: recipient.city,
          address_state: recipient.state,
          address_zip: recipient.zip,
        },
        front: `<html> <head> <meta charset="UTF-8"> <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:700' rel='stylesheet' type='text/css'> <title>Lob.com Address Verification 4x6 Postcard Template Front</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; /* your background image should have dimensions of 1875x1275 pixels. */ background-image: url('https://s3-us-west-2.amazonaws.com/lob-assets/homelove-pc-bg.jpg'); background-size: 6.25in 4.25in; background-repeat: no-repeat; } /* do not put text outside of the safe area */ #safe-area { position: absolute; width: 5.875in; height: 3.875in; left: 0.1875in; top: 0.1875in; text-align: center; } #logo { height: 1in; position: relative; top: .9in; } #tagline { position: relative; top: 1in; font-family: 'Source Sans Pro'; font-weight: 700; font-size: .16in; text-transform: uppercase; letter-spacing: .03in; color: white; border-top: 1px solid white; padding-top: .15in; width: 4in; margin: auto; } </style> </head> <body> <!-- do not put text outside of the safe area --> <div id="safe-area"> <!-- your logo here! --> <img src="https://i.sli.mg/6gpRpX.jpg" id="logo"> <div id="tagline">${front}</div> </div> </body> </html>`,
        back: `<html> <head> <meta charset="UTF-8"> <link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700' rel='stylesheet' type='text/css'> <title>Lob.com Address Verification 4x6 Postcard Template Back</title> <style> *, *:before, *:after { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; box-sizing: border-box; } body { width: 6.25in; height: 4.25in; margin: 0; padding: 0; background-color: white; } #banner { height: 1in; background-color: #9b2a62; font-family: 'Source Sans Pro'; font-weight: 700; font-size: .16in; text-transform: uppercase; letter-spacing: .03in; color: white; text-align: center; padding-top: .5in; } /* do not put text outside of the safe area */ #safe-area { position: absolute; width: 5.875in; height: 3.875in; left: 0.1875in; top: 0.1875in; } #message { position: absolute; width: 2.2in; height: 2in; top: 1.1in; left: .25in; font-family: 'Source Sans Pro'; font-weight: 400; font-size: .122in; } #code-banner { text-align: center; font-size: .14in; } #code { font-family: 'Source Sans Pro'; font-weight: 700; font-size: .15in; text-transform: uppercase; letter-spacing: .02in; color: #9b2a62; border: 2px solid #9b2a62; width: 2in; padding: .1in; margin: .1in auto; } #logo { width: 1.5in; position: relative; left: .5in; top: .1in; } .accent { color: #9b2a62; } </style> </head> <body> <div id="banner"> ${sender.firstname} sent you a stampChat! </div> <!-- do not put text outside of the safe area --> <div id="safe-area"> <div id="message"> <span class="accent">${recipient.firstname},</span> <br><br> ${back} <br><br> </div> <br> </div> </div> </body> </html>`,
        data: {
          name: recipient.firstname,
        },
      };
      console.log(JSON.stringify(cardBody));

      fetch(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(cardBody),
      })
      .then(res => res.json())
      .then(body => resolve(body));
    });
};
