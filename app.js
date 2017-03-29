
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();

// Require routes
const users = require('./server/routes/users');
const documents = require('./server/routes/documents');
const roles = require('./server/routes/roles');

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Require our routes into the application.
// require('./server/routes')(app);

app.use('/api', users);
app.use('/api', documents);
app.use('/api', roles);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to my application.',
}));

module.exports = app;
