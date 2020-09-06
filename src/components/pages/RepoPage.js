import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';

import { get_repo } from '../../services/api/repo';

export default class RepoPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repo: null,
    };
  }

  componentDidMount() {
    const { repoId } = this.props.match.params;

    get_repo(repoId, (res) => {
      console.log('Inside get_repo callback');
      console.log(res.data);
      this.setState({ ...this.state, repo: res.data });
    });
  }

  render() {
    const { repo } = this.state;
    console.log('sdfsd');
    return (
      <div>
        <NavigationBar />
        <div>Hello there</div>

        {repo && (
          <div>
            <h5>{repo.name}</h5>
            <h5>{repo.description}</h5>
          </div>
        )}
      </div>
    );
  }
}
