import { combineReducers } from 'redux';

import { postsReducer } from './posts';
import { profileReducer } from './profile';

export const rootReducer = combineReducers({
  posts: postsReducer,
  profile: profileReducer
});
