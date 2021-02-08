import * as actionTypes from '../../constants/actionTypes';

const config = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CONFIG_SUCCESS:
            return { ...state, envUrl: action.payload };
        case actionTypes.SET_QUERY_PARAMS:
            return {
                ...state,
                ...action.params,
            };
        case actionTypes.FETCH_CONTENT_SUCCESS:
            return { ...state, externalContent: action.payload };
        default:
            return state;
    }
};

export { config };
