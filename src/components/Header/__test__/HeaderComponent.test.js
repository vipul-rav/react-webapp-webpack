import React from 'react';
import { render } from 'setupTests';
import { HeaderComponent } from '../HeaderComponent';
import configureMockStore from 'redux-mock-store';

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

  const { container, getByText } = render(<HeaderComponent {...props} store={store} />);

  return {
    props,
    container,
    getByText
  };
};

describe('Header Component', () => {
  it('should render', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
