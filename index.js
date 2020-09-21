const express = require('express');
const app = express();

const { config } = require('./config/index');
const notesApi = require('./routes/notes');

//Routes
notesApi(app);

//init express server
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
