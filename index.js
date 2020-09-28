const express = require('express');
const app = express();

const { config } = require('./config/index');
const notesApi = require('./routes/notes');

const { logErrors, errorHandler } = require('./utils/middleware/errorHandler');

//Middleware
app.use(express.json()); //Body parser

//Routes
notesApi(app);

//Error Midleware
app.use(logErrors);
app.use(errorHandler);

//init express server
app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
