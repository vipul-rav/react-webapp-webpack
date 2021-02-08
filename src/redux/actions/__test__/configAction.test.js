import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import fetchMock from 'fetch-mock';
import * as actionTypes from '../../../constants/actionTypes';
import * as urls from '../../../constants/urls';
import * as actions from '../configAction';
const middlewares = [apiMiddleware, thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates FETCH_CONFIG_SUCCESS when fetching config values has been done', () => {
        const body = {
            apiUrl: 'https://jsonplaceholder.typicode.com',
        };
        fetchMock.getOnce(urls.ENVconfig, { body: body });

        const expectedActions = [
            { type: actionTypes.FETCH_CONFIG, meta: { loading: true } },
            {
                type: actionTypes.FETCH_CONFIG_SUCCESS,
                meta: { loading: false },
                payload: body,
            },
        ];
        const store = mockStore();

        return store.dispatch(actions.fetchConfig()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('creates FETCH_CONTENT_SUCCESS when fetching config values has been done', () => {
        const body = {
            exampleA: 'an example content item',
        };
        fetchMock.getOnce(urls.CONTENT_URL, { body: body });

        const expectedActions = [
            { type: actionTypes.FETCH_CONTENT, meta: { loading: true } },
            {
                type: actionTypes.FETCH_CONTENT_SUCCESS,
                meta: { loading: false },
                payload: body,
            },
        ];
        const store = mockStore();

        return store.dispatch(actions.fetchContent()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
