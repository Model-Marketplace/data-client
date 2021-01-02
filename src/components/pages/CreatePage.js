import React, { Component } from 'react';
import NavigationBar from '../menus/NavigationBar';

import { create_repo } from '../../services/api/repo';

export default class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      description: '',
      image: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    create_repo(this.state, () => {
      this.setState({ name: '', description: '', image: null }, () =>
        this.props.history.push('/home')
      );
    });
  }

  render() {
    const { name, description, image, url } = this.state;
    return (
      <div className="page-vh">
        <NavigationBar />
        <section className="marg-t-sm marg-b-sm">
          <form
            onSubmit={this.onSubmit}
            className="layout-col-6 marg-c el-box pad-c-s"
          >
            <h4>Create Repository</h4>
            <p className="marg-t-xs">
              A repository contains all relevant data entries, including the
              revision history.
            </p>
            <hr className="marg-t-sm" />
            <h4 className="marg-t-sm">Background</h4>
            <p className="marg-t-xs">
              Enter basic information to describe the repository contents.
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
            <select className="select marg-t-xs">
              <option value="" disabled selected="selected">
                Type
              </option>
              <option value="image">Image</option>
              <option value="text">Text</option>
              <option value="image">Custom</option>
            </select>
            <textarea
              type="text"
              name="description"
              value={description}
              placeholder="Description"
              className="textarea layout-size--full-width marg-t-sm"
              onChange={(e) => this.onChange(e)}
            />
            <hr className="marg-t-sm" />
            <h4 className="marg-t-sm">Accessibility</h4>
            <p className="marg-t-xs">
              Define who gets to access this repository.
            </p>
            <div className="layout-flex layout-flex--center marg-t-sm">
              <input
                type="radio"
                name="public"
                value="public"
                className="marg-r-sm"
              ></input>
              <img
                src="https://www.redditstatic.com/avatars/avatar_default_07_0079D3.png"
                className="el-image el-image--s marg-r-sm"
              />
              <div>
                <h4>Public</h4>
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
                className="el-image el-image--s marg-r-sm"
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
        {/* <Footer /> */}
      </div>
    );
  }
}
