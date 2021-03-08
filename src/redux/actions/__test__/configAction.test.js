import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actionTypes from 'constants/actionTypes';
import * as urls from 'constants/urls';
import * as actions from '../configAction';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates FETCH_CONFIG_SUCCESS when fetching config values has been done', () => {
    const body = {
      apiUrl: 'https://jsonplaceholder.typicode.com'
    };
    fetchMock.getOnce(urls.ENVconfig, { body: body });

    const expectedActions = {
      type: actionTypes.FETCH_CONFIG,
      payload: {
        endpoint: urls.ENVconfig,
        method: 'GET',
        onSuccess: () => jest.fn(),
        onFailure: () => jest.fn()
      },
      meta: {
        loading: true
      }
    };

    const store = mockStore();

    return Promise.resolve(store.dispatch(actions.fetchConfig())).then(() => {
      const recieved = JSON.stringify(store.getActions());
      const expected = JSON.stringify([expectedActions]);
      // return of async actions
      expect(recieved).toEqual(expected);
    });
  });

  it('creates FETCH_CONTENT_SUCCESS when fetching config values has been done', () => {
    const body = {
      exampleA: 'an example content item'
    };
    fetchMock.getOnce(urls.CONTENT_URL, { body: body });

    const expectedActions = {
      type: actionTypes.FETCH_CONTENT,
      payload: {
        endpoint: urls.CONTENT_URL,
        method: 'GET',
        onFailure: () => jest.fn(),
        onSuccess: () => jest.fn()
      },
      meta: { loading: true }
    };
    const store = mockStore();

    return Promise.resolve(store.dispatch(actions.fetchContent())).then(() => {
      const recieved = JSON.stringify(store.getActions());
      const expected = JSON.stringify([expectedActions]);
      // return of async actions
      expect(recieved).toEqual(expected);
    });
  });
});
