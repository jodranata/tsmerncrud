import express from 'express';
import { getPosts, createPost } from '../controllers/posts.controller.js';

const route = express.Router();

route.get('/', getPosts);
route.post('/', createPost);

export default route;
