import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ErrorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: props.hasError || false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-console
    console.log(info);
  }
  render() {
    const { content } = this.props;
    if (this.state.hasError) {
      return (
        <div>
          <h1>{content.errorHeader}</h1>
          <div>
            <p> {content.errorText} </p>
          </div>
          <div>
            <button>{content.ExitText}</button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorComponent.propTypes = {
  content: PropTypes.object.isRequired,
  children: PropTypes.any,
  hasError: PropTypes.bool
};

export { ErrorComponent };
