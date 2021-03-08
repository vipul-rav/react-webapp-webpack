import { createAction } from '@reduxjs/toolkit';
import { GET_METHOD } from '../../constants/stringConstant';
import * as actionTypes from '../../constants/actionTypes';
import * as urls from '../../constants/urls';
import { actionFailed } from './errorAction';

export const fetchConfig = createAction(actionTypes.FETCH_CONFIG, function prepare() {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: urls.ENVconfig,
      method: GET_METHOD,
      onSuccess: configSuccess,
      onFailure: actionFailed
    }
  };
});

const configSuccess = createAction(actionTypes.FETCH_CONFIG_SUCCESS, function prepare(response) {
  return {
    payload: response
  };
});

export const fetchContent = createAction(actionTypes.FETCH_CONTENT, function prepare() {
  return {
    meta: {
      loading: true
    },
    payload: {
      endpoint: urls.CONTENT_URL,
      method: GET_METHOD,
      onSuccess: contentSuccess,
      onFailure: actionFailed
    }
  };
});

const contentSuccess = createAction(actionTypes.FETCH_CONTENT_SUCCESS, function prepare(response) {
  return {
    meta: { loading: false },
    payload: response
  };
});
