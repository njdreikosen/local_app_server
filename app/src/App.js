import React, {useState } from "react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

// Import all required modules here
import Login from "./Login"
import Home from "./Home"
import Calendar from "./Calendar"
import FileServer from "./FileServer"

//import './App.css';

function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  }

  return {
    setToken: saveToken,
    token
  }
}

function App() {
  const {token, setToken} = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

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
