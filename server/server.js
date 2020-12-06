import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

import config from './config/config.env.js';
import connect from './config/db.js';

import postRoute from './routes/posts.routes.js';

const { PORT, MONGO_URL } = config;

const app = express();
connect(MONGO_URL);

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use(
  cors({
    origin: config.CLIENT_URL,
  }),
);

app.use('/post', postRoute);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Page not found',
  });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
