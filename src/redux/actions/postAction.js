import * as actionTypes from '../../constants/actionTypes';
import * as urls from '../../constants/urls';
import { createAction, getJSON } from 'redux-api-middleware';

export const getPostList = () => ({
    type: actionTypes.FETCH_POSTS,
    meta: { nextAction: getPosts() },
});

export const getPosts = () => {
    return createAction({
        endpoint: urls.GET_POST_LIST,
        method: 'GET',
        types: [
            {
                type: actionTypes.FETCH_POSTS,
                meta: {
                    loading: true,
                },
            },
            {
                type: actionTypes.FETCH_POSTS_SUCCESS,
                //Sample api call for next api call
                payload: (_action, _state, res) =>
                    getJSON(res).then((json) => {
                        res.json = json;
                        return json;
                    }),
                meta: (_action, _state, res) => {
                    return {
                        nextAction: getPostDetails(res.json[0].id),
                        loading: true,
                    };
                },
            },
            {
                type: actionTypes.FETCH_POSTS_FAILED,
                meta: {
                    loading: false,
                },
            },
        ],
    });
};

export const getPostDetails = (postId) => {
    return createAction({
        endpoint: `${urls.GET_POST_BY_ID}${postId}`,
        method: 'GET',
        types: [
            {
                type: actionTypes.FETCH_POSTS_DETAILS,
                meta: {
                    loading: true,
                },
            },
            {
                type: actionTypes.FETCH_POSTS_DETAILS_SUCCESS,
                meta: {
                    loading: false,
                },
            },
            {
                type: actionTypes.FETCH_POSTS_DETAILS_FAILED,
                meta: {
                    loading: false,
                },
            },
        ],
    });
};
