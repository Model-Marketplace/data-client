import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import InfiniteScroll from 'react-infinite-scroller';

import NavigationBar from '../menus/NavigationBar';
import SortFilter from '../widgets/SortFilter';
import Repo from '../blocks/Repo';

import { get_all_repos } from '../../services/api/repo';

export class HomePage extends Component {
  constructor(props) {
    super(props);

    this.loadItems = this.loadItems.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      loading: true,
      repos: [],
      width: 0,
      height: 0,
      hasMore: true,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    get_all_repos({ skip: 0 }, (res) => {
      this.setState((prevState) => ({
        ...prevState,
        loading: false,
        hasMore: true,
        repos: res.data.repos,
      }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  loadItems(page) {
    const { repos } = this.state;
    console.log('List of repos: ');
    console.log(repos)
    if (repos.length > 0) {
      get_all_repos({ skip: repos.length }, (res) => {
        if (res.data.repos.length == 0) {
          this.setState({
            ...this.state,
            loading: false,
            hasMore: false,
          });
        } else {
          this.setState((prevState) => ({
            ...prevState,
            loading: false,
            repos: [...prevState.repos, ...res.data.repos],
          }));
        }
      });
    }
  }

  updateWindowDimensions() {
    this.setState({
      ...this.state,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  render() {
    const { loading, repos, width, hasMore } = this.state;
    return (
      <div className="page">
        <NavigationBar />
        <BarLoader width={width} height={2} loading={loading} />
        <section>
          {repos.length > 0 && (
            <div className="layout-col-6 marg-c">
              <SortFilter />
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems}
                hasMore={hasMore}
              >
                {repos.map((repo) => 
                <div key={repo._id} className="el-box pad-c-s marg-t-sm">
                  <Repo repo={repo} /> 
                </div>
                )}
              </InfiniteScroll>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withRouter(HomePage);
