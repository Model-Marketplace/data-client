import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="footer">
    <div className="layout-flex layout-flex--around marg-b-sm">
      <div>
        <h5>Company</h5>
        <p className="marg-t-xs">Team</p>
        <p>Contact Us</p>
        <p>Press & Media</p>
      </div>
      <div>
        <h5>Other</h5>
      </div>
    </div>
    <hr className="hr" />
    <div className="layout-flex layout-flex--around marg-t-sm">
      <div>
        <h5>&copy; 2020 Data Project</h5>
      </div>
      <div>
        <h5>FB, IG</h5>
      </div>
    </div>
  </div>
);
