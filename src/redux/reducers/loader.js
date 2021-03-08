const initialState = {
  loading: true
};

const loader = (state = initialState, action) => {
  const { meta } = action;
  if (meta && typeof meta.loading === 'boolean') {
    return { ...state, loading: meta.loading };
  }
  return state;
};

export { loader };
