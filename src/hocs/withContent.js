import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = (state) => ({
  content: state.config.externalContent
});

const withContent = () => (WrappedComponent) => {
  const WithContent = ({ ...props }) => {
    return <WrappedComponent {...props} />;
  };

  WithContent.propTypes = {
    id: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.objectOf(PropTypes.string)]).isRequired,
    children: PropTypes.func
  };

  return connect(mapStateToProps)(WithContent);
};

export { withContent };
