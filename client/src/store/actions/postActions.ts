import axios, { AxiosResponse, AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';

import { CREATE_POST, PostDetailTypes, PostActions } from '../types';
import { RootState } from '../store';

export const handleGetPosts = () => {};
export const handleCreatePostAction = (
  data: PostDetailTypes,
): ThunkAction<void, RootState, unknown, PostActions<PostDetailTypes>> => (
  dispatch: Dispatch<PostActions<PostDetailTypes>>,
): void => {
  axios
    .post('/api/post', { post: data })
    .then((res: AxiosResponse) => {
      console.log(res);
    })
    .catch((err: AxiosError) => {});
};

// export const handleCreatePost = (
//   postData: PostDetailTypes,
// ): ThunkAction<void, RootState, unknown, PostActions<PostDetailTypes>> => {};
