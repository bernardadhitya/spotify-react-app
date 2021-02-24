import React, { useState, useEffect } from 'react';
import { fetchUsers, login } from '../../Service';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
  let history = useHistory();
  const [users, setUsers] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetchUsers();
        setUsers(response);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [])

  const handleLogin = async () => {
    await login();
    console.log('logged in');
    return history.push('/home');
  }

  return (
    <div>
      <h1>Welcome to Spotipu</h1>
      <div className='login-btn' onClick={() => handleLogin()}>
        <h3>Login</h3>
      </div>
    </div>
  );
};

export default Login;