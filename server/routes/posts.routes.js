import express from 'express';
import { getPosts, createPost } from '../controllers/posts.controller.js';
import formEmptyValidation from '../middlewares/postValidation.js';

const route = express.Router();

route.get('/', getPosts);
route.post('/', formEmptyValidation, createPost);

export default route;
