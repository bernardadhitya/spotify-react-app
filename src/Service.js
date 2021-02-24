import axios from 'axios/index';

const USER_API = `http://localhost:8200`;

export const fetchUsers = () => {
  return (
    axios.get(`${USER_API}/users`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response)
  )
};