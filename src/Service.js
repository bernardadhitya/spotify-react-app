import axios from 'axios/index';

const USER_API = `http://localhost:8888`;

export const fetchUsers = () => {
  return (
    axios.get(`${USER_API}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response)
  )
};

export const login = () => {
  return (
    axios.get(`${USER_API}/login`)
    .then((response) => {
      localStorage.setItem('loggedIn', 'true');
    })
    .catch((error) => error.response)
  )
}