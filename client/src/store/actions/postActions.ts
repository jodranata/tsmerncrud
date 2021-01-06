import axios, { AxiosResponse, AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import {
  CREATE_POST,
  PostDetailTypes,
  PostActions,
  SET_ERROR,
  SET_LIKE,
  GET_POSTS,
  DELETE_POST,
  PostDataResponseType,
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
  PostActions<PostDataResponseType>
> => (dispatch: Dispatch<PostActions<PostDataResponseType>>): void => {
  axios
    .get('/api/post')
    .then((res: AxiosResponse<PostsResponseTypes<PostDataResponseType>>) => {
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
): ThunkAction<void, RootState, unknown, PostActions<PostDataResponseType>> => (
  dispatch: Dispatch<PostActions<PostDataResponseType>>,
): void => {
  axios
    .post('/api/post', { post: data })
    .then((res: AxiosResponse<PostsResponseTypes<PostDataResponseType>>) => {
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

export const handleDeletePostAction = (
  id: string,
): ThunkAction<void, RootState, unknown, PostActions<PostDataResponseType>> => (
  dispatch: Dispatch<PostActions<PostDataResponseType>>,
): void => {
  axios
    .delete(`/api/post/${id}`)
    .then((res: AxiosResponse<PostsResponseTypes<PostDataResponseType>>) => {
      if (res.data.post)
        dispatch({ type: DELETE_POST, payload: res.data.post });
    })
    .catch((err: AxiosError<PostsResponseTypes>) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response?.data.message || 'Cannot Delete Post',
      });
    });
};

export const handleLikeOrUnlikePost = (
  type: string,
  id: string,
): ThunkAction<void, RootState, unknown, PostActions<PostDataResponseType>> => (
  dispatch: Dispatch<PostActions<PostDataResponseType>>,
): void => {
  axios
    .put(`/api/post/${type}/${id}`)
    .then((res: AxiosResponse<PostsResponseTypes<PostDataResponseType>>) => {
      if (res.data.post) dispatch({ type: SET_LIKE, payload: res.data.post });
    })
    .catch((err: AxiosError<PostsResponseTypes>) => {});
};
