/* eslint-disable no-underscore-dangle */
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotEnv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotEnv.config({ path: `${__dirname}/.env` });

const config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  CLIENT_URL: process.env.CLIENT_URL,
};

export default config;
