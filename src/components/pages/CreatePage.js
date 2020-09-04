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
      this.setState({ name: '', description: '', public: true }, () =>
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
            <h3>Create Repository</h3>
            <p className="marg-t-xs">
              A repository contains all relevant data entries, including the
              revision history.
            </p>
            <hr className="marg-t-sm" />
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Name"
              autoComplete="off"
              className="input-text marg-t-sm"
              onChange={e => this.onChange(e)}
            />
            <select className="select marg-t-xs">
              <option value="" disabled selected="selected">
                Type
              </option>
              <option value="image">Image Repository</option>
            </select>
            <textarea
              type="text"
              name="description"
              value={description}
              placeholder="Description"
              className="textarea layout-size--full-width marg-t-xs"
              onChange={e => this.onChange(e)}
            />
            <hr className="marg-t-sm" />
            <div className="layout-flex layout-flex--center marg-t-sm">
              <input
                type="radio"
                name="public"
                value="public"
                className="marg-r-sm"
              ></input>
              <img
                src="https://www.redditstatic.com/avatars/avatar_default_07_0079D3.png"
                className="element-image element-image--m marg-r-sm"
              />
              <div>
                <h5>Public</h5>
                <p>Anyone on the internet can see this repository</p>
              </div>
            </div>
            <div className="layout-flex layout-flex--center marg-t-sm">
              <input
                type="radio"
                name="public"
                value="private"
                className="marg-r-sm"
              ></input>
              <img
                src="https://www.redditstatic.com/avatars/avatar_default_14_7E53C1.png"
                className="element-image element-image--m marg-r-sm"
              />
              <div>
                <h5>Private</h5>
                <p>You choose who can see and commit to this repository</p>
              </div>
            </div>
            <hr className="marg-t-sm" />
            <button className="button-shaded marg-t-sm">
              Create Repository
            </button>
          </form>
        </section>
      </div>
    );
  }
}
