import React from 'react';
import { render } from 'setupTests';
import { LoaderComponent } from '../LoaderComponent';
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

  const { container, getByText } = render(<LoaderComponent {...props} store={store} />);

  return {
    props,
    container,
    getByText
  };
};

describe('Loader Component', () => {
  it('should render isLoading=true', () => {
    const overrideProps = {
      isLoading: true,
      content: {
        loadingText: 'Please wait...'
      }
    };
    const { container } = setup(overrideProps);
    expect(container).toMatchSnapshot();
  });
  it('should render isLoading=false', () => {
    const overrideProps = {
      isLoading: false,
      content: {
        loadingText: 'Please wait...'
      }
    };
    const { container } = setup(overrideProps);
    expect(container).toMatchSnapshot();
  });
});
