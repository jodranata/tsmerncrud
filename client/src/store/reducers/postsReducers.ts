import {
  CREATE_POST,
  GetPostsActionTypes,
  CreatePostActionTypes,
  PostDetailTypes,
  DataStateTypes,
  PostActions,
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

const handleSetError = () => {};

const handleClearError = () => {};

const postsReducer = (
  state: DataStateTypes<PostDetailTypes> = INIT_STATE,
  action: PostActions<PostDetailTypes>,
): DataStateTypes<PostDetailTypes> => {
  switch (action.type) {
    case CREATE_POST:
      return handleCreatePost(state, action);
    default:
      return state;
  }
};

export default postsReducer;
