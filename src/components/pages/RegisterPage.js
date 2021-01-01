import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { register } from '../../services/api/auth';

export class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    register(this.state, () => {
      this.setState({ email: '', password: '' }, () =>
        this.props.history.push('/home')
      );
    });
  }

  render() {
    const { email, password, firstName, lastName } = this.state;
    return (
      <div className="page-vh">
        <div className="el-box layout-col-4 layout-position--center">
          <div className="layout-col-3 marg-c marg-t-sm">
            <form onSubmit={this.onSubmit}>
              <h3 className="text-align-c">Classify</h3>
              <input
                type="text"
                name="firstName"
                value={firstName}
                placeholder="First name"
                onChange={(e) => this.onChange(e)}
                autoComplete="off"
                className="input-text layout-size--full-width marg-t-m"
              />
              <input
                type="text"
                name="lastName"
                value={lastName}
                placeholder="Last name"
                onChange={(e) => this.onChange(e)}
                autoComplete="doff"
                className="input-text layout-size--full-width marg-t-xs"
              />
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => this.onChange(e)}
                autoComplete="off"
                className="input-text layout-size--full-width marg-t-xs"
              />
              <input
                type="password"
                name="password"
                value={password}
                placeholder="New password"
                onChange={(e) => this.onChange(e)}
                autoComplete="off"
                className="input-text layout-size--full-width marg-t-xs"
              />
              <button className="button-shaded layout-size--full-width marg-t-sm">
                Register
              </button>
            </form>
            <h5 className="text-align-c marg-t-m marg-b-sm">
              Already have an account? <Link to="/login">Login</Link>
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterPage);
