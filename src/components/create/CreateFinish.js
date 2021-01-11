import React from 'react';
import PuffLoader from 'react-spinners/PuffLoader';
import SquareLoader from 'react-spinners/SquareLoader';

export default ({ name }) => (
  <div>
    <h4>Initialization</h4>
    <p className="marg-t-xs">
      {`Creating an empty repository named ${name}. Once created, you
      will be able to add data and co-owners; you will even be able to monetize
      off of incoming predictions. For an overview of repository management, you
      may consult this post.`
      }
    </p>
    <div className="marg-t-l marg-b-l text-align-c">
      <PuffLoader size={50} color="#2980b9" />
    </div>
  </div>
);