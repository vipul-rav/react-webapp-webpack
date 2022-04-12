import { createAction } from '@reduxjs/toolkit';
import { actionFailed } from './errorAction';
import { GET_METHOD } from '../../constants/stringConstant';
import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_DETAILS,
  FETCH_POSTS_DETAILS_SUCCESS
} from '../../constants/actionTypes';
import { GET_POST_LIST, GET_POST_BY_ID } from '../../constants/urls';

export const getPostList = createAction(FETCH_POSTS_REQUEST, function prepare() {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: GET_POST_LIST,
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

const postListSuccess = createAction(FETCH_POSTS_SUCCESS, function prepare(response) {
  return {
    payload: response
  };
});

export const getPostDetails = createAction(FETCH_POSTS_DETAILS, function prepare(postId) {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: `${GET_POST_BY_ID}${postId}`,
      method: GET_METHOD,
      onSuccess: postDetailSuccess,
      onFailure: actionFailed
    }
  };
});

const postDetailSuccess = createAction(FETCH_POSTS_DETAILS_SUCCESS, function prepare(response) {
  return {
    payload: response,
    meta: {
      loading: false
    }
  };
});
