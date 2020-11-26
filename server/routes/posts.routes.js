import express from 'express';
import { getMessages, postMessage } from '../controllers/posts.controller.js';

const route = express.Router();

route.get('/', getMessages);
route.post('/', postMessage);

export default route;
