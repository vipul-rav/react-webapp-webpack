const nextActionMiddleware = (store) => (next) => (action) => {
    if (!action.meta || !action.meta.nextAction) {
        return next(action);
    }
    const result = next(action);
    store.dispatch(action.meta.nextAction);
    return result;
};

export { nextActionMiddleware };
