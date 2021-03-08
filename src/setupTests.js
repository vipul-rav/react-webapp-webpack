import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

let store;
beforeEach(() => {
  const mockStore = configureMockStore();
  store = mockStore();
});

// eslint-disable-next-line react/prop-types
const AllTheProviders = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
const customRender = (ui, options) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
