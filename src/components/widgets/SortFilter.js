import React, { Component } from 'react';

export default class SortFilter extends Component {
  constructor(props) {
    super(props);

    this.handleSelected = this.handleSelected.bind(this);

    this.state = {
      options: [
        { name: 'recommended', value: 'Recommended', icon: 'fas fa-rocket' },
        { name: 'popular', value: 'Most Popular', icon: 'fab fa-hotjar' },
      ],
      selected: 'recommended',
    };
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

  render() {
    const { options } = this.state;
    return (
      <div className="el-box pad-c-s layout-flex layout-flex--between layout-flex--center marg-t-sm">
        <div className="layout-flex layout-flex--between layout-flex--center">
          {options.map((option) => (
            <div
              key={option.name}
              onClick={() => this.setState({ selected: option.name })}
              className="layout-flex layout-flex--between layout-flex--center marg-r-sm sortfilter-group"
              style={this.handleSelected(option.name)}
            >
              {/* <i className={`${option.icon} marg-r-xs`}></i> */}
              <h5>{option.value}</h5>
            </div>
          ))}
        </div>
        <div className="sortfilter-group">
          <h5>Today</h5>
        </div>
      </div>
    );
  }
}
