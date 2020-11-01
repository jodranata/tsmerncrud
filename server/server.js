const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const config = require('./config/config.env');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

app.listen(config.PORT, () => {
  console.log(`app is running on port ${config.PORT}`);
});
