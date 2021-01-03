import axios from 'axios';

const create_repo = (payload, callback) => {
  axios
    .post('http://localhost:3000/api/repos/create', payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const get_all_repos = (payload, callback) => {
  axios
    .post('http://localhost:3000/api/repos', payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const get_repo = (payload, callback) => {
  axios
    .get(`http://localhost:3000/api/repos/${payload}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const update_repo = (id, payload, callback) => {
  axios
    .put(`http://localhost:3000/api/repos/${id}`, payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      callback(res);
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const invite_coowner = (id, payload, callback) => {
  axios
    .post(`http://localhost:3000/api/invite/${id}`, payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      console.log(res);
      callback();
    })
    .catch((err) => {
      console.log(err.response);
    });
}

export { 
  create_repo, 
  get_all_repos, 
  get_repo, 
  update_repo, 
  invite_coowner 
};
