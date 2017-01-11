const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello world.');
});

app.post('/', (req, res) => {
  console.log(req.body);
  // createPostcard

  res.send('Hello World!');
});

app.listen(1337, () => {
  console.log('stampChat backend listening on port 1337!');
});
