import React from 'react';

export default ({ name, description, onChange }) => (
  <div>
    <h4 className="marg-t-sm">Basic Information</h4>
    <p className="marg-t-xs">
      Enter basic information to describe your repository contents; a clear name
      and description will go a long way towards increasing the reach and
      visibility of your repository should you decide to make it public.
    </p>
    <input
      type="text"
      name="name"
      value={name}
      placeholder="Spam Detection"
      autoComplete="off"
      className="input-text marg-t-sm"
      onChange={(e) => onChange(e)}
    />
    <select defaultValue="text" className="select marg-t-xs">
      <option value="text">Text</option>
      <option value="custom">Custom</option>
    </select>
    <textarea
      type="text"
      name="description"
      value={description}
      placeholder="A repository with spam/non-spam emails for anyone who wishes to integrate a spam-filter"
      className="textarea layout-size--full-width marg-t-sm"
      onChange={(e) => onChange(e)}
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
        <h5>Public</h5>
        <p>Anyone on the internet can see this repository</p>
      </div>
    </div>
    <div className="layout-flex layout-flex--center marg-t-sm marg-b-sm">
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
  </div>
);