import { Dispatch } from 'redux';

import { ACTION_TYPES_POSTS } from './actionTypes';
import { moxios, API_URL, API_ROUTES } from '../../../services/moxios';
import { Post } from '../../../types';

const fetchPostsStarted = () => ({
  type: ACTION_TYPES_POSTS.FETCH_POSTS_STARTED
});

const fetchPostsSuccess = (data: Post[]) => ({
  type: ACTION_TYPES_POSTS.FETCH_POSTS_SUCCESS,
  payload: data
});

const fetchPostsFail = (err: any) => ({
  type: ACTION_TYPES_POSTS.FETCH_POSTS_FAIL,
  payload: err
});

export const fetchPosts = () => async (dispatch: Dispatch) => {
  dispatch(fetchPostsStarted());

  let res;
  try {
    res = await moxios.get({ url: `${API_URL}${API_ROUTES.POSTS}` });
    dispatch(fetchPostsSuccess(res));
  } catch (err) {
    dispatch(fetchPostsFail(err));
  }
};
