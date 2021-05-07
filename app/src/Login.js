/* External Imports */
import axios from 'axios';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
/* Style Imports */
import './css/Login.css';


// Login Page component
function Login({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [loginErr, setLoginErr] = useState(false);
  const [buttonType, setButtonType] = useState();
  const loginIcon = <FontAwesomeIcon icon={faSignInAlt} size="1x" />
  const signupIcon = <FontAwesomeIcon icon={faUserPlus} size="1x" />

  // onSubmit handler for the Login form
  const handleLogin = (e) => {
    e.preventDefault();
    // If the button wasn't the signup button, login the user instead
    // (includes if the user hits 'Enter' instead of clicking a button)
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
        setLoginErr(true);
      });
    } else {
      // Signup the user instead
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
      <div className='login-buttons'>
        <button
          type="submit"
          onClick={() => setButtonType('login')}
        >
          <div>Login</div>
          <div>{loginIcon}</div>
        </button>
        <button
          type="submit"
          onClick={() => setButtonType('signup')}
        >
          <div>Sign Up</div>
          <div>{signupIcon}</div>
        </button>
      </div>
      <div className={`${loginErr === false ? 'hidden-err' : 'visible-err'}`}>
        Invalid Username or Password.<br/>If you have forgetten your password,<br/>please contact the system administrator.
      </div>
    </form>
  )
}

export default Login;
