import * as React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: undefined };

  componentDidCatch(_error, _info) {
    this.setState({ hasError: true });
  }

  render() {
    const { error } = this.state;

    if (!error) {
      return this.props.children;
    }

    return <React.Fragment>Something went wrong.</React.Fragment>;
  }
}

export default ErrorBoundary;
