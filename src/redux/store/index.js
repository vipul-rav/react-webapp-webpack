import { createStore, applyMiddleware, compose } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import { routerMiddleware } from 'connected-react-router';
import { apiUrlMiddleware } from '../../middlewares/apiUrlMiddleware';
import { nextActionMiddleware } from '../../middlewares/nextActionMiddleware';
import { historyMiddleware } from '../../middlewares/historyMiddleware';
import { rootReducer } from '../../redux/reducers';
import { history } from '../../routes';

const allMiddleware = [
    apiUrlMiddleware,
    apiMiddleware,
    nextActionMiddleware,
    historyMiddleware,
    thunk,
];

if (process.env.NODE_ENV !== 'production') {
    allMiddleware.push(immutableStateInvariantMiddleware());
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    rootReducer(history),
    composeEnhancers(
        applyMiddleware(...allMiddleware, routerMiddleware(history))
    )
);

if (module.hot) {
    module.hot.accept('redux/reducers', () => {
        store.replaceReducer(rootReducer(history));
    });
}
