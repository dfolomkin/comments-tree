import { AnyAction } from 'redux';

import { ACTION_TYPES_POSTS } from '../actions';

const initialState = {
  isLoading: false,
  error: null,
  items: []
};

export const postsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ACTION_TYPES_POSTS.FETCH_POSTS_STARTED:
      return { ...state, isLoading: true };
    case ACTION_TYPES_POSTS.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: false,
        items: action.payload
      };
    case ACTION_TYPES_POSTS.FETCH_POSTS_FAIL:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};
