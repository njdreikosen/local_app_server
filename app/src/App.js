/* External Imports */
import React, {useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
/* Internal Imports */
import axiosInterceptor from './AxiosConfig'
// Import all required modules here
import Calendar from './Calendar'
import FileServer from './FileServer'
import Home from './Home'
import Login from './Login'


// Functionality for using JWTs
function useToken() {
  // Get the token, and return it if it exists
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  // Save the token using session storage
  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  // Return the token and set token funciton
  return {
    setToken: saveToken,
    token
  }
}


// Overall App component
function App() {
  const {token, setToken} = useToken();

  // If the token isn't set, the user needs to login
  if (!token) {
    return <Login setToken={setToken} />
  }
  // Else, render the app
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/calendar">
          <Calendar />
        </Route>
        <Route path="/file_server">
          <FileServer />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
