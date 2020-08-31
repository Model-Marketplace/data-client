import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { check_auth } from '../../services/api/auth';

export default ComposedComponent => {
  class CheckAuth extends Component {
    constructor(props) {
      super(props);

      this.state = {
        isAuthenticated: false
      };
    }

    componentWillMount() {
      check_auth(
        () => this.setState({ isAuthenticated: true }),
        () => this.props.history.push('/login')
      );
    }

    render() {
      const { isAuthenticated } = this.state;
      return (
        <div>{isAuthenticated && <ComposedComponent {...this.props} />}</div>
      );
    }
  }

  return withRouter(CheckAuth);
};
