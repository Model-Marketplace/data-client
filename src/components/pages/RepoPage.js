import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Repo from '../blocks/Repo';

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
      this.setState({ ...this.state, repo: res.data });
    });
  }

  render() {
    const { repo } = this.state;
    return (
      <div>
        <NavigationBar />
        <section>
          {repo && (
            <div className="layout-col-6 marg-c">
              <div className="el-box pad-c-s marg-t-sm">
                <div className="marg-b-sm">
                  <Repo repo={repo} />
                </div>
                <hr className="hr" />
                <h5 className="marg-t-sm">API Endpoint — Upload Data</h5>
                <p className="marg-t-xs">
                  To contribute data to this repository, you must upload data
                  to the endpoint indicated in the gray box; data must conform 
                  to community guidelines and be in accordance with the 
                  format specified by the repository owners.
                </p>
                <div className="el-box-grey pad-c-s marg-t-sm">
                  <span className="span-code">
                    {`POST: localhost:3000/upload/${repo._id}`}
                  </span>
                </div>
                <h5 className="marg-t-sm marg-b-sm">Owners</h5>
                <div>
                  {repo.owners.map((owner) => (
                      <Link
                        to={`/profile/${owner.username}`}
                        className="link"
                        key={owner._id}
                      >
                        <img
                          src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
                          className="el-image el-image--s marg-r-sm"
                        />
                      </Link>
                  ))}
                </div>
                <h5 className="marg-t-sm marg-b-sm">Contributors</h5>
                <div>
                  {repo.contributors.map((contributor) => (
                      <Link
                        to={`/profile/${contributor.username}`}
                        className="link"
                        key={contributor._id}
                      >
                        <img
                          src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
                          className="el-image el-image--s marg-r-sm"
                        />
                      </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}
