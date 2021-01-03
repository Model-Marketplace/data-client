import axios from 'axios';

const get_inbox = (payload, callback) => {
  axios
    .post('http://localhost:3000/api/inbox', payload, {
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

export { get_inbox };