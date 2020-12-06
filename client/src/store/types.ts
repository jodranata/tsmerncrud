export const GET_POSTS = 'GET_POSTS';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const SET_ERROR = 'SET_ERROR';
export const LOADING_UI = 'LOADING_UI';

export interface PostIndexArray {
  [key: string]: string;
}

export interface PostDetailTypes extends PostIndexArray {
  title: string;
  author: string;
  tags: string;
  body: string;
}

export interface GetPostsActionTypes<T> {
  type: typeof GET_POSTS;
  payload: T[];
}

export interface CreatePostActionTypes<T> {
  type: typeof CREATE_POST;
  payload: T;
}

export interface DataStateTypes<T> {
  posts: T[] | null;
  error: null | string;
}

export type PostActions<T> = GetPostsActionTypes<T> | CreatePostActionTypes<T>;
