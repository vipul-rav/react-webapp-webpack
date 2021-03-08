import axios from 'axios';
import { configSelectors } from '../selectors';

const apiUrlMiddleware = (store) => (next) => async (action) => {
  const result = await next(action);
  const { payload } = action;
  if (!payload || !payload.endpoint) {
    return result;
  }

  const { endpoint, method, onSuccess, onFailure, body } = payload;

  const storeState = store.getState();

  const urlSelectors = {
    apiUrl: configSelectors.apiUrl
  };

  const newEndpoint = Object.keys(urlSelectors).reduce(
    (curEndpoint, selectorKey) => curEndpoint.replace(selectorKey, urlSelectors[selectorKey](storeState)),
    endpoint
  );

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  };

  try {
    const response = await axios.request({
      url: newEndpoint,
      method,
      headers,
      ...(body && { data: JSON.stringify(body) })
    });
    if (response.status === 200) {
      store.dispatch(onSuccess(response.data));
    } else {
      store.dispatch(onFailure(response.data));
    }
  } catch (error) {
    store.dispatch(onFailure(error));
  }
};

export { apiUrlMiddleware };
