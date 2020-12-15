import axios, { AxiosResponse, AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import {
  CREATE_POST,
  PostDetailTypes,
  PostActions,
  SET_ERROR,
  GET_POSTS,
} from '../types';
import { RootState } from '../store';

interface PostsResponseTypes<T = null> {
  success: boolean;
  posts: T[];
  post?: T;
  message?: string;
}

export const handleGetPosts = (): ThunkAction<
  void,
  RootState,
  unknown,
  PostActions<PostDetailTypes>
> => (dispatch: Dispatch<PostActions<PostDetailTypes>>): void => {
  axios
    .get('/api/post')
    .then((res: AxiosResponse<PostsResponseTypes<PostDetailTypes>>) => {
      dispatch({ type: SET_ERROR, payload: null });
      dispatch({ type: GET_POSTS, payload: res.data.posts });
    })
    .catch((err: AxiosError<PostsResponseTypes>) => {
      dispatch({ type: GET_POSTS, payload: null });
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data.message || 'Cannot Get Post',
      });
    });
};

export const handleCreatePostAction = (
  data: PostDetailTypes,
): ThunkAction<void, RootState, unknown, PostActions<PostDetailTypes>> => (
  dispatch: Dispatch<PostActions<PostDetailTypes>>,
): void => {
  axios
    .post('/api/post', { post: data })
    .then((res: AxiosResponse<PostsResponseTypes<PostDetailTypes>>) => {
      dispatch({ type: SET_ERROR, payload: null });
      if (res.data.post) {
        dispatch({ type: CREATE_POST, payload: res.data.post });
      }
    })
    .catch((err: AxiosError<PostsResponseTypes>) => {
      dispatch({
        type: SET_ERROR,
        payload:
          err.response?.data.message || 'Cannot create post, Please try again!',
      });
    });
};
