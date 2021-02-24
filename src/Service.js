import axios from 'axios/index';

const USER_API = `http://localhost:8888`;

export const fetchUser = () => {
  return (
    axios.get(`${USER_API}/user`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => error.response)
  )
};

export const login = async () => {
  return (
    await axios.get(`${USER_API}/login`)
    .then(() => {
      localStorage.setItem('loggedIn', 'true');
    })
    .catch((error) => error.response)
  )
}