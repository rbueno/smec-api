require('dotenv').config();

const mongoose = require('mongoose');
const mongodbConfig = require('./src/config/database/mongodb');

mongoose.connect(mongodbConfig[process.env.NODE_ENV], { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch( err => console.log('Error connecting to MondoDB', err))

const app = require('./src/app');

app.listen(process.env.PORT || 5000, () => console.log('Server running in port ', process.env.PORT || 5000));