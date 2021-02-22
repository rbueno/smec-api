const express = require('express');
require('express-async-errors');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const AppError = require('./error/AppError');
const morgan = require('morgan');
const textContent = require('./utils/textContent');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: '5mb' }));

app.use(cors());
app.use(morgan('dev'));
app.use('/v1', routes);

app.use((req, res) => {
  res.status(404).json({ message: 'not-found' })
})

app.use((err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message || textContent.error.unexpected,
    });
  };
  return res.status(err.status || 500).json({ message: `Server Error - ${err.message}` });
})

module.exports = app;