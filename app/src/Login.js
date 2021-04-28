import React, {useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

//import './css/Login.css';

async function loginUser(credentials) {
  return axios.post('http://192.168.1.100:4000/login', {
        name: credentials
    }).then(res =>  res.data);
}

function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleLogin = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        <p>Username</p>
        <input type="text" onChange={(e) => setUserName(e.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </label>
      <div>
        <button type="submit">
          Login
        </button>
      </div>
    </form>
  )
}

export default Login;
