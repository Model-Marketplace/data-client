import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';

export default class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = { username: '' };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    this.setState({ ...this.state, username });
  }

  render() {
    const { username } = this.state;
    return (
      <div className="page">
        <NavigationBar />
        <section className="marg-t-sm">
          <div className="el-box layout-col-6 marg-c">
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
              className="el-image el-image--l"
            />
          </div>
          <div className="el-box layout-col-6 marg-c marg-t-sm">
            <h3>Repositories</h3>
          </div>
        </section>
      </div>
    );
  }
}
