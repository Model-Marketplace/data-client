import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import moment from 'moment';

import NavigationBar from '../menus/NavigationBar';
import SortFilter from '../widgets/SortFilter';

import { get_all_repos } from '../../services/api/repo';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      loading: true,
      repos: null,
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    get_all_repos((res) => {
      const { repos } = res.data;
      this.setState({ ...this.state, repos, loading: false });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({
      ...this.state,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  render() {
    const { repos, width, loading } = this.state;
    return (
      <div className="page">
        <NavigationBar />
        <BarLoader width={width} height={2} loading={loading} />
        <section>
          <div className="layout-col-6 marg-c">
            <SortFilter />
            {repos &&
              repos.map((repo) => (
                <div
                  key={repo._id}
                  className="element-box layout-flex marg-t-sm"
                >
                  <img
                    src="https://www.redditstatic.com/avatars/avatar_default_19_46A508.png"
                    className="element-image element-image--m marg-r-sm"
                  />
                  <div>
                    <h5>{repo.name}</h5>
                    <p>
                      {repo.owners.map((owner) => (
                        <span key={owner._id}>
                          <Link
                            to={`/profile/${owner.username.replace(
                              /@.*$/,
                              ''
                            )}`}
                            className="link"
                          >
                            {owner.username.replace(/@.*$/, '')}
                          </Link>
                        </span>
                      ))}
                    </p>
                    <p className="marg-t-xs">{repo.description}</p>
                    <p>{`Updated ${moment(repo.updatedAt).toNow(true)} ago`}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(HomePage);
