import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';

import Repo from '../blocks/Repo';
import RepoView from '../repo/RepoView';
import RepoData from '../repo/RepoData';
import RepoSettings from '../repo/RepoSettings';
import RepoSecurity from '../repo/RepoSecurity';

import { get_repo } from '../../services/api/repo';

export default class RepoPage extends Component {
  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.renderSwitch = this.renderSwitch.bind(this);

    this.state = {
      repo: null,
      is_owner: false,
      options: [
        { name: 'view', value: 'Overview' },
        { name: 'data', value: 'Data' },
        { name: 'settings', value: 'Settings' },
        { name: 'security', value: 'Security' }
      ],
      selected: 'settings'
    };
  }

  componentDidMount() {
    const { repoId } = this.props.match.params;
    get_repo(repoId, (res) => {
      const is_owner = res.data.owners
                    .map((owner) => owner.username)
                    .includes(localStorage.getItem('username'));

      this.setState({ 
        ...this.state, 
        repo: res.data,
        is_owner 
      });
    });
  }

  handleSelected(option) {
    const { selected } = this.state;

    if (option === selected) {
      return {
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        color: 'rgb(41, 128, 185)',
      };
    }

    return { backgroundColor: 'transparent' };
  }

  handleUpdate(updatedRepo) {
    this.setState({
      ...this.state,
      repo: updatedRepo
    });
  }

  renderSwitch(selected) {
    const { repo } = this.state;
    switch (selected) {
      case 'view':
        return <RepoView repo={repo} />
      case 'data':
        return <RepoData repo={repo} />
      case 'settings':
        return <RepoSettings repo={repo} handleUpdate={this.handleUpdate} />
      case 'security':
        return <RepoSecurity repo={repo} handleUpdate={this.handleUpdate} />
      default:
        return <RepoView repo={repo} />
    }
  }

  render() {
    const { repo, is_owner, options, selected } = this.state;
    return (
      <div className="page-vh">
        <NavigationBar />
        <section>
          {is_owner && (
            <div className="layout-col-6 marg-c el-box pad-c-s marg-t-sm">
              <h3 className="marg-b-sm">{repo.name}</h3>
              <hr className="hr" />
              <div className="layout-flex marg-t-sm">
                {options.map((option) => (
                    <div
                      key={option.name}
                      onClick={() => this.setState({ selected: option.name })}
                      className="layout-flex layout-flex--between layout-flex--center marg-r-sm sortfilter-group"
                      style={this.handleSelected(option.name)}
                    >
                      <h5>{option.value}</h5>
                    </div>
                  ))}
              </div>
            </div>
          )}
          
          {repo && (
            <div className="layout-col-6 marg-c">
              <div className="el-box pad-c-s marg-t-sm">
                <div className="marg-b-sm">
                  <Repo repo={repo} />
                </div>
                {this.renderSwitch(selected)}
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}
