import axios from 'axios';

const check_auth = (callback, callback2) => {
  axios
    .get('http://localhost:3000/users', {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      console.log(res);
      callback();
    })
    .catch(err => {
      console.log(err.response);
      localStorage.removeItem('token');
      callback2();
    });
};

const register = (payload, callback) => {
  axios
    .post('http://localhost:3000/users/create', payload)
    .then(res => {
      const { token, username } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      callback();
    })
    .catch(err => {
      console.log(err.response);
    });
};

const login = (payload, callback) => {
  axios
    .post('http://localhost:3000/users/login', payload)
    .then(res => {
      const { token, username } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username.replace(/@.*$/, ''));
      callback();
    })
    .catch(err => {
      console.log(err.response);
    });
};

const logout = callback => {
  axios
    .post('http://localhost:3000/users/logout')
    .then(res => {
      localStorage.removeItem('token');
      callback();
    })
    .catch(err => {
      console.log(err.response);
    });
};

export { check_auth, register, login, logout };
