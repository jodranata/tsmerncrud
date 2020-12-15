import {
  CREATE_POST,
  GET_POSTS,
  GetPostsActionTypes,
  CreatePostActionTypes,
  SetErrorActionTypes,
  PostDetailTypes,
  DataStateTypes,
  PostActions,
  SET_ERROR,
} from '../types';

const INIT_STATE = {
  posts: [],
  error: null,
};

const handleCreatePost = (
  state: DataStateTypes<PostDetailTypes>,
  action: CreatePostActionTypes<PostDetailTypes>,
): DataStateTypes<PostDetailTypes> => ({
  ...state,
  posts: state.posts !== null ? [action.payload, ...state.posts] : null,
});

const handleGetPosts = (
  state: DataStateTypes<PostDetailTypes>,
  action: GetPostsActionTypes<PostDetailTypes>,
): DataStateTypes<PostDetailTypes> => ({
  error: null,
  posts: action.payload,
});

const handleSetError = (
  state: DataStateTypes<PostDetailTypes>,
  action: SetErrorActionTypes,
): DataStateTypes<PostDetailTypes> => ({
  ...state,
  error: action.payload,
});

const postsReducer = (
  state: DataStateTypes<PostDetailTypes> = INIT_STATE,
  action: PostActions<PostDetailTypes>,
): DataStateTypes<PostDetailTypes> => {
  switch (action.type) {
    case CREATE_POST:
      return handleCreatePost(state, action);
    case GET_POSTS:
      return handleGetPosts(state, action);
    case SET_ERROR:
      return handleSetError(state, action);
    default:
      return state;
  }
};

export default postsReducer;
