import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { invite_coowner } from '../../services/api/repo';

export default class RepoSecurity extends Component {
  constructor(props) {
    super(props);
    
    this.onInvitePressed = this.onInvitePressed.bind(this);
    
    this.state =  {
      invitee: ''
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onInvitePressed() {
    const { invitee } = this.state;
    const { repo } = this.props;
    invite_coowner(repo._id, this.state, () => {
      this.setState({ invitee: '' });
    })
  }
  
  render(){
    const { repo } = this.props;
    const { invitee } = this.state;
    return (
      <div>
        <hr className="hr" />
        <h5 className="marg-t-sm">Manage Owners</h5>
        <div className="marg-t-xs">
          {repo.owners.map((owner) => (
            <div key={owner._id} className="layout-flex layout-flex--between">
              <div className="layout-flex">
                <Link
                  to={`/profile/${owner.username}`}
                  className="link"
                >
                  <img
                    src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
                    className="el-image el-image--s marg-r-sm"
                  />
                </Link>
                <p>{owner.username}</p>
                </div>
                <p>Remove</p>
            </div>
          ))}
        </div>
        <p className="marg-t-sm">
          You may invite users to become co-owners of this repository by typing
          their username and clicking the invite button; invitees will receive
          notifications to accept or reject invitations. As co-owners, users
          can add new co-owners or remove existing co-owners and are expected
          to maintain data repositories in accordance with the community guidelines.
        </p>
        <div className="layout-flex marg-t-sm">
          <input 
            name="invitee"
            value={invitee}
            autoComplete="off"
            placeholder="dangtony98"
            className="input-text marg-r-sm" 
            onChange={(e) => this.onChange(e)}
          />
          <button
            onClick={() => this.onInvitePressed()}
            className="button-shaded"
          >
            Invite
          </button>
        </div>
      </div>
    )
  }
}