import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';

const Login = () => {
  let history = useHistory();

  const handleLogin = async () => {
    var win = window.open('http://localhost:8888/login', '_self');
    win.focus();
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