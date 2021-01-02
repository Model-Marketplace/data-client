import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ repo }) => {
  return (
    <div className="layout-flex">
      <img
        src="https://www.redditstatic.com/avatars/avatar_default_19_46A508.png"
        className="el-image el-image--s marg-r-sm"
      />
      <div>
        <div className="layout-flex layout-flex--between">
        <Link to={`/repo/${repo._id}`} className="link">
          <h5>{repo.name}</h5>
        </Link>
        </div>
        <p>{repo.usage}</p>
        <p className="marg-t-xs">{repo.description}</p>
        <p>{`Updated ${moment(repo.updatedAt).toNow(true)} ago`}</p>
      </div>
    </div>
  );
}