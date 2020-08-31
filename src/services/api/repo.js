import axios from 'axios';

const create_repo = (payload, callback) => {
  axios
    .post('http://localhost:3000/repos/create', payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      callback(res);
    })
    .catch(err => {
      console.log(err.response);
    });
};

const get_all_repos = callback => {
  axios
    .get('http://localhost:3000/repos', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      callback(res);
    })
    .catch(err => {
      console.log(err.response);
    });
};

export { create_repo, get_all_repos };
