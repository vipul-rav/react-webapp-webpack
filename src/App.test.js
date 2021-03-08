import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { App } from './App';
import { render } from 'setupTests';

const content = {
  ExitText: 'Exit',
  btnContinue: 'Continue',
  loadingText: 'Please wait...'
};

const setup = (overridesProps) => {
  const props = {
    ...overridesProps
  };
  const mockStore = configureMockStore();
  const store = mockStore({
    config: {
      externalContent: content
    },
    error: {
      showError: false
    },
    loader: {
      loading: false
    }
  });
  const wrapper = render(
    <Provider store={store}>
      <App {...props} />
    </Provider>
  );

  return {
    props,
    wrapper
  };
};

describe('App ', () => {
  it('should render', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
