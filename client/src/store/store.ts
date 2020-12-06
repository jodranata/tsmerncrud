import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import postsReducer from './reducers/postsReducers';

const middleware = [thunk];

const store = createStore(
  postsReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export type RootState = ReturnType<typeof postsReducer>;
export default store;
