import React, { Component } from 'react';

import NavigationBar from '../menus/NavigationBar';

import { create_repo } from '../../services/api/repo';

export default class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);

    this.state = {
      name: '',
      description: ''
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    create_repo(this.state, () => {
      this.setState({ name: '', description: '' }, () =>
        this.props.history.push('/home')
      );
    });
  }

  render() {
    const { name, description } = this.state;
    return (
      <div className="page">
        <NavigationBar />
        <section className="marg-t-sm">
          <form
            onSubmit={this.onSubmit}
            className="layout-col-6 marg-c element-box"
          >
            <div>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Repository Name"
                autoComplete="off"
                className="input-text"
                onChange={e => this.onChange(e)}
              />
              <textarea
                type="text"
                name="description"
                value={description}
                placeholder="Repository Description"
                className="textarea marg-t-xs"
                onChange={e => this.onChange(e)}
              />
            </div>
            <button className="button-shaded marg-t-sm">
              Create Repository
            </button>
          </form>
        </section>
      </div>
    );
  }
}
