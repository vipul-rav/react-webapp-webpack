import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { config } from './config';
import { loader } from './loader';
import { error } from './error';
import { post } from './post';

const rootReducer = (history) => {
  return combineReducers({
    loader,
    config,
    error,
    post,
    router: connectRouter(history)
  });
};

export { rootReducer };
