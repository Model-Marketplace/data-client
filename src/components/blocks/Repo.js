import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

export default ({ repo }) => (
  <div key={repo._id} className="el-box pad-c-s layout-flex marg-t-sm">
    <img
      src="https://www.redditstatic.com/avatars/avatar_default_19_46A508.png"
      className="el-image el-image--s marg-r-sm"
    />
    <div>
      <h5>{repo.name}</h5>
      <p>
        {repo.owners.map((owner) => (
          <span key={owner._id}>
            <Link
              to={`/profile/${owner.username.replace(/@.*$/, '')}`}
              className="link"
            >
              {owner.username.replace(/@.*$/, '')}
            </Link>
          </span>
        ))}
      </p>
      <p className="marg-t-xs">{repo.description}</p>
      <p>{`Updated ${moment(repo.updatedAt).toNow(true)} ago`}</p>
    </div>
  </div>
);
