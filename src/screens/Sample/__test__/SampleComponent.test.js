import React from 'react';
import { render } from 'setupTests';
import { SampleComponent } from '../SampleComponent';
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

  const { container, getByText } = render(<SampleComponent {...props} store={store} />);

  return {
    props,
    container,
    getByText
  };
};

describe('Sample Component', () => {
  it('should render', () => {
    const overrideProps = {
      isLoading: true,
      postList: [
        {
          id: '1',
          title: 'title1'
        }
      ]
    };
    const { container } = setup(overrideProps);
    expect(container).toMatchSnapshot();
  });
});
