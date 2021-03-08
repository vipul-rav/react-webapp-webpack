import React from 'react';
import { cleanup } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { render } from 'setupTests';
import { Sample2Container } from '../Sample2Container';

const content = {
  ExitText: 'Exit',
  btnContinue: 'Continue',
  homePageText: 'Home Page'
};

const setup = (overridesProps) => {
  const props = {
    content: content,

    ...overridesProps
  };

  const mockStore = configureMockStore();
  const store = mockStore({
    config: {
      externalContent: content
    }
  });

  const { container, getByText } = render(<Sample2Container {...props} store={store} />);

  return {
    props,
    container,
    getByText
  };
};

describe('Sample2 container', () => {
  afterEach(cleanup);
  it('should render', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });
});
