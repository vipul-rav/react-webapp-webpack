import React from 'react';
import { render } from 'setupTests';
import { ErrorComponent } from '../ErrorComponent';
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

  const { container, getByText } = render(
    <ErrorComponent {...props} store={store}>
      <div>test</div>
    </ErrorComponent>
  );

  return {
    props,
    container,
    getByText
  };
};

describe('Error Component', () => {
  it('should render - hasError=true', () => {
    const overrideProps = {
      hasError: true,
      content: {
        errorHeader: 'Technical Error',
        errorText: 'There are some technical error',
        ExitText: 'Exit'
      }
    };
    const { container } = setup(overrideProps);
    expect(container).toMatchSnapshot();
  });
  it('should render - hasError=false', () => {
    const overrideProps = {
      hasError: false,
      content: {
        errorHeader: 'Technical Error',
        errorText: 'There are some technical error',
        ExitText: 'Exit'
      }
    };
    const { container } = setup(overrideProps);
    expect(container).toMatchSnapshot();
  });
});
