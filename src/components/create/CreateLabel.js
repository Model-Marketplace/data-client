import React from 'react';

export default ({ labels, onChange }) => (
  <div>
    <h4 className="marg-t-sm">Labels</h4>
    <p className="marg-t-xs">
      Enter a mapping for the repository labels; it will be used as a 
      reference by other contributors and users of this repository. To be
      compatible with DataGrid, your mapping should follow the format specified
      here.
    </p>
    <input
      type="text"
      name="labels"
      value={labels}
      placeholder="spam: 1, non-spam: 0"
      autoComplete="off"
      className="input-text marg-t-sm marg-b-sm"
      onChange={(e) => onChange(e)}
    />
  </div>
);