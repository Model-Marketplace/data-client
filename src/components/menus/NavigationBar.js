import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { logout } from '../../services/api/auth';

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      username: '',
      search: ''
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    this.setState({ ...this.state, username });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { username, search } = this.state;
    return (
      <div className="nav-bar wrapper-flex wrapper-flex--spaced wrapper-flex--center">
        <div className="wrapper-flex wrapper-flex--center">
          <Link to="/home" className="link">
            <h3 className="marg-r-m">lorem ipsum</h3>
          </Link>
          <input
            type="text"
            name="search"
            value={search}
            placeholder="Search"
            autoComplete="off"
            className="nav-bar-search input-text marg-r-sm"
            onChange={e => this.onChange(e)}
          />
          <button
            onClick={() => this.props.history.push('/create')}
            className="button-shaded"
          >
            Create Repository
          </button>
        </div>
        <div className="wrapper-flex">
          <img
            src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
            className="element-image marg-r-xs"
          />
          <div>
            <h5>{username}</h5>
            <h5 onClick={() => logout(() => this.props.history.push('/login'))}>
              Logout
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NavigationBar);
