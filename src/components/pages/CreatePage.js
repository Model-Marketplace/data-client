import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NavigationBar from '../menus/NavigationBar';
import CreateBasic from '../create/CreateBasic';
import CreateLabel from '../create/CreateLabel';

import { create_repo } from '../../services/api/repo';

export class CreatePage extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      name: '',
      description: '',
      labels: '',
      page: 1
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

  handleNext(direction) {
    const { page } = this.state;
    switch (direction) {
      case 'backward':
        this.setState({ ...this.state, page: page - 1 });
        break;
      case 'forward':
        if (page == 2) {
          create_repo(this.state, (res) => {
            const { repo } = res.data;
            this.setState({ name: '', description: '' }, () => {
              this.props.history.push(`/repo/${repo._id}`)
            });
          });
        } else {
          this.setState({ ...this.state, page: page + 1 });
        }
        break;
    }
  }

  render() {
    const { name, description, labels, page } = this.state;
    return (
      <div className="page-vh">
        <NavigationBar />
        <section className="marg-t-sm marg-b-sm">
          <div className="layout-col-6 marg-c el-box pad-c-s">
            <h4>Create Repository</h4>
            <p className="marg-t-xs">
              A repository contains all relevant data entries, including the
              revision history.
            </p>
            <hr className="marg-t-sm" />
            {(page == 1) && (
              <CreateBasic name={name}
                description={description}
                onChange={this.onChange}
              />
            )}
            {(page == 2) && (
              <CreateLabel 
                labels={labels}
                onChange={this.onChange}
              />
            )}
            <hr className="hr" />
            <div className="marg-t-sm">
              {(page > 1) && (
                <button 
                  className="button marg-r-xs"
                  onClick={() => this.handleNext('backward')}
                >
                  Back
                </button>
              )}
              <button 
                className="button-shaded"
                onClick={() => this.handleNext('forward')}
              >
                {(page == 1) ? 'Next' : 'Finish'}
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default withRouter(CreatePage);