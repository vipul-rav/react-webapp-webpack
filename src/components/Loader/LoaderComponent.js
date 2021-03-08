import React, { memo } from 'react';
import PropTypes from 'prop-types';

const LoaderComponent = memo(({ content, isLoading = false }) =>
  isLoading ? (
    <div id="preloader">
      <div id="loader">
        {content.loadingText}
        <div className="spin" />
      </div>
    </div>
  ) : null
);

LoaderComponent.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  content: PropTypes.object.isRequired
};

LoaderComponent.defaultProps = {
  content: {
    loadingText: 'Please wait....'
  }
};

export { LoaderComponent };
