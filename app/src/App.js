import React from "react"
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'

// Import all required modules here
import Home from "./Home"
import Interface from "./Interface"

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/interface">
          <Interface />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
