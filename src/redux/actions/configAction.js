import * as actionTypes from '../../constants/actionTypes';
import * as urls from '../../constants/urls';
import { RSAA } from 'redux-api-middleware';

export const fetchConfig = () => ({
    [RSAA]: {
        endpoint: urls.ENVconfig,
        method: 'GET',
        types: [
            {
                type: actionTypes.FETCH_CONFIG,
                meta: {
                    loading: true,
                },
            },
            {
                type: actionTypes.FETCH_CONFIG_SUCCESS,
                meta: {
                    loading: false,
                },
            },
            {
                type: actionTypes.FETCH_CONFIG_FAILED,
                meta: {
                    loading: false,
                },
            },
        ],
    },
});

export const fetchContent = () => ({
    [RSAA]: {
        endpoint: urls.CONTENT_URL,
        method: 'GET',
        types: [
            {
                type: actionTypes.FETCH_CONTENT,
                meta: {
                    loading: true,
                },
            },
            {
                type: actionTypes.FETCH_CONTENT_SUCCESS,
                meta: {
                    loading: false,
                },
            },
            {
                type: actionTypes.FETCH_CONTENT_FAILED,
            },
        ],
    },
});
