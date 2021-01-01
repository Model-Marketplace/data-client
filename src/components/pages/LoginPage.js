import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import { login } from '../../services/api/auth';

export class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      email: '',
      password: '',
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    login(this.state, () => {
      this.setState({ email: '', password: '' }, () =>
        this.props.history.push('/home')
      );
    });
  }

  render() {
    const { email, password } = this.state;
    return (
      <div className="page-vh">
        <div className="el-box layout-col-4 layout-position--center">
          <div className="layout-col-3 marg-c marg-t-sm">
            <form onSubmit={this.onSubmit}>
              <h3 className="text-align-c">Classify</h3>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => this.onChange(e)}
                className="input-text layout-size--full-width marg-t-m"
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={(e) => this.onChange(e)}
                className="input-text layout-size--full-width marg-t-xs"
              />
              <button className="button-shaded layout-size--full-width marg-t-sm">
                Login
              </button>
            </form>
            <h5 className="text-align-c marg-t-m">Forgot password?</h5>
            <h5 className="text-align-c marg-t-xs marg-b-sm">
              Don't have an account? <Link to="/register">Sign up</Link>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(LoginPage);
