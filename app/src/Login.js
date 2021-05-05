import React, {useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/Login.css';

async function loginUser(credentials) {
  return axios.post('http://192.168.1.100:4000/login', {
        name: credentials
    }).then(res =>  res.data);
}

function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginErr, setLoginErr] = useState(false);

  //const handleLogin = async (e) => {
  const handleLogin = (e) => {
    e.preventDefault();
    //const token = await loginUser({
    //  username,
    //  password
    //});
    axios.post('http://192.168.1.100:4000/login', {
      credentials: {
        username: username,
        password: password
      }
    }).then(res => {
      if (res.status === 401) {
        console.log("401 received in 'then'");
      } else {
        console.log("res-token: " + res.data)
        setToken(res.data);
      }
    }).catch(error => {
      console.log("loginErr: " + error);
      console.log(error.res.status);
      setLoginErr(true)
    });
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
        <button type="submit">
          Login
        </button>
        <button type="submit">
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
