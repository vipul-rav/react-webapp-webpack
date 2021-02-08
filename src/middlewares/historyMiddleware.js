import { push } from 'connected-react-router';

const historyMiddleware = (store) => (next) => (action) => {
    const result = next(action);
    if (action.path) {
        store.dispatch(push(action.path));
    }
    return result;
};

export { historyMiddleware };
