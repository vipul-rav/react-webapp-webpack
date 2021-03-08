import { createAction } from '@reduxjs/toolkit';
import { actionFailed } from './errorAction';
import { GET_METHOD } from '../../constants/stringConstant';
import * as actionTypes from '../../constants/actionTypes';
import * as urls from '../../constants/urls';

export const getPostList = createAction(actionTypes.FETCH_POSTS, function prepare() {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: urls.GET_POST_LIST,
      method: GET_METHOD,
      onSuccess: postsSuccess,
      onFailure: actionFailed
    }
  };
});

const postsSuccess = (response) => (dispatch) => {
  dispatch(postListSuccess(response));
  dispatch(getPostDetails(response[0].id));
};

const postListSuccess = createAction(actionTypes.FETCH_POSTS_SUCCESS, function prepare(response) {
  return {
    payload: response
  };
});

export const getPostDetails = createAction(actionTypes.FETCH_POSTS_DETAILS, function prepare(postId) {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: `${urls.GET_POST_BY_ID}${postId}`,
      method: GET_METHOD,
      onSuccess: postDetailSuccess,
      onFailure: actionFailed
    }
  };
});

const postDetailSuccess = createAction(actionTypes.FETCH_POSTS_DETAILS_SUCCESS, function prepare(response) {
  return {
    payload: response,
    meta: {
      loading: false
    }
  };
});
