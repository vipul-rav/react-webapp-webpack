import { createAction } from '@reduxjs/toolkit';
import * as actionTypes from '../../constants/actionTypes';

export const actionFailed = createAction(actionTypes.FETCH_FAILED, function prepare(response) {
  return {
    meta: { loading: false },
    payload: response
  };
});
