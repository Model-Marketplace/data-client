import React from 'react';
import { Link } from 'react-router-dom';

export default ({ repo }) => (
  <div>
    <hr className="hr" />
    <h5 className="marg-t-sm">API Endpoint — Upload Data</h5>
    <p className="marg-t-xs">
      To contribute data to this repository, you must upload data
      to the endpoint indicated in the gray box; data must conform 
      to the community guidelines and be in accordance with the 
      format specified by the repository owners.
    </p>
    <div className="el-box-grey pad-c-s marg-t-sm">
      <span className="span-code">
        {`POST: localhost:3000/upload/${repo._id}`}
      </span>
    </div>
    <h5 className="marg-t-sm">Owners</h5>
    <div className="marg-t-xs">
      {repo.owners.map((owner) => (
          <Link
            to={`/profile/${owner.username}`}
            className="link"
            key={owner._id}
          >
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
              className="el-image el-image--s marg-r-sm"
            />
          </Link>
      ))}
    </div>
    <h5 className="marg-t-sm">Contributors</h5>
    <div className="marg-t-xs">
      {repo.contributors.map((contributor) => (
          <Link
            to={`/profile/${contributor.username}`}
            className="link"
            key={contributor._id}
          >
            <img
              src="https://www.redditstatic.com/avatars/avatar_default_18_0079D3.png"
              className="el-image el-image--s marg-r-sm"
            />
          </Link>
      ))}
    </div>
  </div>
)