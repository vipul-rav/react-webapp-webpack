import { createReducer } from '@reduxjs/toolkit';
import * as actionTypes from '../../constants/actionTypes';

const config = createReducer(
  {},
  {
    [actionTypes.FETCH_CONFIG_SUCCESS]: (state, action) => {
      return { ...state, envUrl: action.payload };
    },
    [actionTypes.FETCH_CONTENT_SUCCESS]: (state, action) => {
      return { ...state, externalContent: action.payload };
    }
  }
);

export { config };
