import React, { Component } from 'react';
import moment from 'moment';

import NavigationBar from '../menus/NavigationBar';
import SortFilter from '../widgets/SortFilter';
import Repo from '../blocks/Repo';

import { get_profile, profile_action } from '../../services/api/profile';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.onFollow = this.onFollowPressed.bind(this);

    this.state = {
      user: null,
      sortFilter: {
        options: [
          { name: 'latest', value: 'Latest' },
          { name: 'popular', value: 'Most Popular' },
        ],
        selected: 'latest',
      },
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    get_profile(username, (res) => {
      const { user } = res.data;
      const amFollowing =
        user.followers.filter(
          (follower) => follower.username === localStorage.getItem('username')
        ).length === 0
          ? false
          : true;

      this.setState(
        {
          ...this.state,
          user: {
            ...user,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            amFollowing,
          },
        },
        () => console.log(this.state)
      );
    });
  }

  onFollowPressed() {
    const { user } = this.state;

    const action = user.amFollowing ? 'unfollow' : 'follow';

    profile_action({ id: user._id, action }, () => {
      this.setState((prevState) => ({
        ...prevState,
        user: {
          ...prevState.user,
          amFollowing: !prevState.user.amFollowing,
          followersCount:
            action == 'unfollow'
              ? prevState.user.followersCount - 1
              : prevState.user.followersCount + 1,
        },
      }));
    });
  }

  render() {
    const { user } = this.state;
    return (
      <div className="page-vh">
        <NavigationBar />
        {user && (
          <section className="layout-col-6 marg-c marg-t-sm">
            <div className="el-box layout-flex pad-c-s">
              <div className="marg-r-sm">
                <img
                  src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
                  className="el-image el-image--l"
                />
                {user.username != localStorage.getItem('username') && (
                  <button
                    onClick={() => this.onFollowPressed()}
                    className="button layout-size--full-width marg-t-sm"
                  >
                    {user.amFollowing ? 'Unfollow' : 'Follow'}
                  </button>
                )}
              </div>
              <div>
                <h3>{user.username}</h3>
                <h5 className="marg-t-sm">{user.bio}</h5>
                <p className="marg-t-xs">{`${user.followersCount} Followers ∙ ${user.followingCount} Following`}</p>
                <p>{`Member since ${moment(user.createdAt).format(
                  'MMMM YYYY'
                )}`}</p>
              </div>
            </div>
            <div className="marg-t-sm">
              <SortFilter />
              {user.repos.map((repo) => (
                <Repo repo={repo} key={repo._id} />
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
}
