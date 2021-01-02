import React, { Component } from 'react';

import { update_repo } from '../../services/api/repo';

export default class RepoEdit extends Component {
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
        <h5 className="marg-t-sm">Edit</h5>
        <p className="marg-t-xs">
          To contribute data to this repository, you must upload data
          to the endpoint indicated in the gray box; data must conform 
          to community guidelines and be in accordance with the 
          format specified by the repository owners.
        </p>
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
        <button className="button-shaded layout-size--full-width marg-t-sm">
          Update Repository
        </button>
      </form>
    )
  }
}