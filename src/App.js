import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { AppRouter } from './routes';
import { LoaderComponent } from './components/Loader';
import { HeaderComponent } from './components/Header';
import { ErrorComponent } from './components/Error';
import { withContent } from './hocs/withContent';

const AppComponent = memo(function App({ loader, content, error }) {
  if (!content) {
    return null;
  }
  return (
    <div>
      <HeaderComponent />
      <div>
        <ErrorComponent hasError={error.showError} content={content}>
          {AppRouter}
          <LoaderComponent isLoading={loader.loading} text={content.loadingText} />
        </ErrorComponent>
      </div>
    </div>
  );
});

const mapStateToProps = (state) => ({
  loader: state.loader,
  error: state.error
});

AppComponent.propTypes = {
  loader: PropTypes.shape({
    loading: PropTypes.bool
  }),
  error: PropTypes.shape({
    loading: PropTypes.bool,
    showError: PropTypes.bool
  }),
  content: PropTypes.object.isRequired
};

const App = compose(withContent(), connect(mapStateToProps))(AppComponent);

export { App };
