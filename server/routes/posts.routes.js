import express from 'express';
import {
  getPosts,
  createPost,
  deletePost,
  likePost,
  unlikePost,
} from '../controllers/posts.controller.js';
import formEmptyValidation from '../middlewares/postValidation.js';

const route = express.Router();

route.get('/', getPosts);
route.post('/', formEmptyValidation, createPost);
route.put('/like/:id', likePost);
route.put('/unlike/:id', unlikePost);
route.delete('/:id', deletePost);

export default route;
