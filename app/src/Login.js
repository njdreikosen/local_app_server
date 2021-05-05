import React, {useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/Login.css';

function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginErr, setLoginErr] = useState(false);
  const [buttonType, setButtonType] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("buttonType: " + buttonType);
    if (buttonType !== 'signup') {
      axios.post('/login', {
        credentials: {
          username: username,
          password: password
        }
      }).then(res => {
        if (res.status === 401) {
          console.log("401 received in 'then'");
          setLoginErr(true);
        } else {
          setToken(res.data);
        }
      }).catch(error => {
        console.log("loginErr: " + error);
        console.log(error.response.status);
        setLoginErr(true);
      });
    } else {
      axios.post('/signup', {
        credentials: {
          username: username,
          password: password
        }
      }).then(res => {
        if (res.status === 401) {
          console.log("401 received in 'then'");
          setLoginErr(true);
        } else {
          setToken(res.data);
        }
      }).catch(error => {
        console.log("signupErr: " + error);
        console.log(error.response.status);
        setLoginErr(true);
      });
    }
  }

  return (
    <form
      className='login-form'
      onSubmit={handleLogin}
    >
      <label className='login-field'>
        <p>Username</p>
        <input type="text" onChange={(e) => setUserName(e.target.value)}/>
      </label>
      <label className='login-field'>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <div>
        <button
          type="submit"
          onClick={() => setButtonType('login')}
        >
          Login
        </button>
        <button
          type="submit"
          onClick={() => setButtonType('signup')}
        >
          Sign Up
        </button>
      </div>
      <div className={`${loginErr === false ? 'hidden-err' : 'visible-err'}`}>
        Invalid Username or Password.<br/>If you have forgetten your password,<br/>please contact the system administrator.
      </div>
    </form>
  )
}

export default Login;
