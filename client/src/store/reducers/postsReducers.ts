/* eslint-disable no-underscore-dangle */
import {
  CREATE_POST,
  GET_POSTS,
  GetPostsActionTypes,
  CreatePostActionTypes,
  SetErrorActionTypes,
  DeletePostActionTypes,
  SetLikePostActionTypes,
  DataStateTypes,
  PostActions,
  SET_ERROR,
  DELETE_POST,
  SET_LIKE,
  PostDataResponseType,
} from '../types';

const INIT_STATE = {
  posts: [],
  error: null,
};

const handleCreatePost = (
  state: DataStateTypes<PostDataResponseType>,
  action: CreatePostActionTypes<PostDataResponseType>,
): DataStateTypes<PostDataResponseType> => ({
  ...state,
  posts: state.posts !== null ? [action.payload, ...state.posts] : null,
});

const handleGetPosts = (
  state: DataStateTypes<PostDataResponseType>,
  action: GetPostsActionTypes<PostDataResponseType>,
): DataStateTypes<PostDataResponseType> => ({
  error: null,
  posts: action.payload,
});

const handleSetError = (
  state: DataStateTypes<PostDataResponseType>,
  action: SetErrorActionTypes,
): DataStateTypes<PostDataResponseType> => ({
  ...state,
  error: action.payload,
});

const handleDeletePost = (
  state: DataStateTypes<PostDataResponseType>,
  action: DeletePostActionTypes<PostDataResponseType>,
): DataStateTypes<PostDataResponseType> => {
  const {
    payload: { _id },
  } = action;
  if (state.posts) {
    const newPosts = state.posts.filter(
      (post: PostDataResponseType) => post._id !== _id,
    );
    return {
      ...state,
      posts: newPosts,
    };
  }
  return {
    ...state,
  };
};

const handleSetLikePost = (
  state: DataStateTypes<PostDataResponseType>,
  action: SetLikePostActionTypes<PostDataResponseType>,
): DataStateTypes<PostDataResponseType> => {
  if (state.posts) {
    const newData = state.posts.map((post: PostDataResponseType) => {
      if (post._id === action.payload._id) return action.payload;
      return post;
    });
    return {
      ...state,
      posts: newData,
    };
  }
  return {
    ...state,
  };
};

const postsReducer = (
  state: DataStateTypes<PostDataResponseType> = INIT_STATE,
  action: PostActions<PostDataResponseType>,
): DataStateTypes<PostDataResponseType> => {
  switch (action.type) {
    case CREATE_POST:
      return handleCreatePost(state, action);
    case GET_POSTS:
      return handleGetPosts(state, action);
    case DELETE_POST:
      return handleDeletePost(state, action);
    case SET_LIKE:
      return handleSetLikePost(state, action);
    case SET_ERROR:
      return handleSetError(state, action);
    default:
      return state;
  }
};

export default postsReducer;
