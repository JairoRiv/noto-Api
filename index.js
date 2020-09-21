const express = require('express');
const app = express();

//impor var envirioment
const { config } = require('./config/index');

//create Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/json', (req, res) => {
  res.json({ Hello: 'World' });
});

app.get('/user/:id', (req, res) => {
  res.send('user ' + req.params.id);
});

//init express server
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
