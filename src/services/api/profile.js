import axios from 'axios';

const get_profile = (payload, callback) => {
  axios
    .get(`http://localhost:3000/profiles/${payload}`, {
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

const profile_action = (payload, callback) => {
  const { id } = payload;
  axios
    .post(`http://localhost:3000/profiles/${id}/action`, payload, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => {
      callback();
    })
    .catch((err) => {
      console.log(err.response);
    });
};

export { get_profile, profile_action };
