const initialState = {
    showError: false,
};

const error = (state = initialState, action) => {
    if (action.error) return { ...state, showError: true };
    const isFailed = action.type && action.type.includes('FAILED');
    return { ...state, showError: isFailed };
};

export { error };
