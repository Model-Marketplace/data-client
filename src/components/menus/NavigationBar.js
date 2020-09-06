import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { search } from '../../services/api/search';
import { logout } from '../../services/api/auth';

export class NavigationBar extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.debouncedSearch = debounce(search, 500);

    this.state = {
      username: '',
      searchTerm: '',
      searchResults: [],
      searchIsOpen: false,
      profileIsOpen: false,
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const username = localStorage.getItem('username');
    this.setState({ ...this.state, username });

    search({ term: '' }, (res) => {
      const { repos } = res.data;
      this.setState({ ...this.state, searchResults: repos });
    });
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ searchIsOpen: false, profileIsOpen: false });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.debouncedSearch({ term: e.target.value }, (res) => {
      const { repos } = res.data;
      this.setState({ ...this.state, searchResults: repos });
    });
  }

  render() {
    const {
      username,
      searchTerm,
      searchResults,
      searchIsOpen,
      profileIsOpen,
    } = this.state;
    return (
      <div className="nav-bar layout-flex layout-flex--between layout-flex--center">
        <div className="layout-flex layout-flex--center">
          <Link to="/home" className="link">
            <h3 className="marg-r-m">Data Project</h3>
          </Link>
          <input
            ref={this.wrapperRef}
            type="text"
            name="searchTerm"
            value={searchTerm}
            placeholder="Search"
            autoComplete="off"
            className="nav-bar-search input-text marg-r-sm"
            onFocus={() =>
              this.setState((prevState) => ({
                searchIsOpen: true,
              }))
            }
            onChange={(e) => this.onChange(e)}
          />
          <button
            onClick={() => this.props.history.push('/create')}
            className="button-shaded"
          >
            Create Repository
          </button>
        </div>
        <div className="layout-flex">
          <img
            src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
            onClick={() =>
              this.setState((prevState) => ({
                profileIsOpen: !prevState.profileIsOpen,
              }))
            }
            className="el-image el-image--s marg-r-sm"
          />
        </div>
        {profileIsOpen && (
          <div className="nav-bar-profile el-box pad-c-s" ref={this.wrapperRef}>
            <p>{username.replace(/@.*$/, '')}</p>
            <hr className="marg-t-sm" />
            <Link to={`/profile/${username}`} className="link">
              <p className="marg-t-sm">Your profile</p>
            </Link>
            <p className="marg-t-xs">Your repositories</p>
            <hr className="marg-t-sm" />
            <p className="marg-t-sm">Settings</p>
            <p
              onClick={() => logout(() => this.props.history.push('/login'))}
              className="marg-t-xs"
            >
              Logout
            </p>
          </div>
        )}
        {searchIsOpen && (
          <div className="nav-bar-results el-box" ref={this.wrapperRef}>
            {searchResults.length > 0 ? (
              <div>
                {searchResults.map((result) => (
                  <div key={result._id}>
                    <div className="el--clickable pad-c-s">
                      <Link to={`/repo/${result._id}`} className="link">
                        <div className="layout-flex">
                          <img
                            src="https://www.redditstatic.com/avatars/avatar_default_19_46A508.png"
                            className="el-image el-image--s marg-r-sm"
                          />
                          <div>
                            <h5>{result.name}</h5>
                            <p>{result.description}</p>
                          </div>
                        </div>
                      </Link>
                    </div>
                    <div className="pad-l-s pad-r-s">
                      <hr className="hr" />
                    </div>
                  </div>
                ))}
                <div className="pad-c-s">See more results</div>
              </div>
            ) : (
              <div className="pad-c-s">
                <h5>No results found</h5>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(NavigationBar);
