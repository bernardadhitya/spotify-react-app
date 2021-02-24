import React from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import spotipuLogo from '../../Assets/spotipu-logo.png'
import { Col, Container, Row } from 'react-bootstrap';

const Login = () => {
  let history = useHistory();

  const handleLogin = async () => {
    var win = window.open('http://localhost:8888/login', '_self');
    win.focus();
  }

  return (
    <div className='login-page'>
      <div>
        <img src={spotipuLogo} alt='logo' width='200px'/>
        <h1>Welcome to Spotipu</h1>
        <p>Please click here to login</p>
        <div className='login-btn' onClick={() => handleLogin()}>
          <h3>Login</h3>
        </div>
      </div>
    </div>
  )
};

export default Login;