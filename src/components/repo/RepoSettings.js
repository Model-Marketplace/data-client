import React, { Component } from 'react';
import Toggle from 'react-toggle'

import { update_repo } from '../../services/api/repo';

export default class RepoSettings extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: ''
    }
  }

  componentDidMount() {
    const { repo } = this.props;
    
    this.setState({
      name: repo.name,
      description: repo.description
    })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const { repo } = this.props;
    update_repo(repo._id, this.state, (res) => {
      const { name, description } = res.data;
      this.setState({ name, description });
      this.props.handleUpdate(res.data);
    });
  }

  render() {
    const{ name, description } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <hr className="hr" />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name"
          autoComplete="off"
          className="input-text marg-t-sm"
          onChange={(e) => this.onChange(e)}
        />
        <textarea
          type="text"
          name="description"
          value={description}
          placeholder="Description"
          className="textarea layout-size--full-width marg-t-sm"
          onChange={(e) => this.onChange(e)}
        />
        <div className="marg-t-sm">
            <div className="layout-flex">
              <Toggle
                defaultChecked={true}
                icons={false}
                onChange={() => true} 
              />
              <div className="marg-l-sm">
                <h5>Upload API</h5>
                <p>
                  Toggle to enable or disable users from uploading 
                  new data to this repository; the restriction will not affect
                  repository owners
                </p>
              </div>
            </div>
            <div className="layout-flex marg-t-sm">
              <Toggle
                defaultChecked={true}
                icons={false}
                onChange={() => true} 
              />
              <div className="marg-l-sm">
                <h5>Predict API</h5>
                <p>
                  Toggle to enable or disable users from making
                  predictions from this repository; the restriction will not 
                  affect repository owners
                </p>
              </div>
            </div>
        </div>
        <button className="button-shaded layout-size--full-width marg-t-sm">
          Update Repository
        </button>
      </form>
    )
  }
}