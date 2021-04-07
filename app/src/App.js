import React from "react"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// Import all required modules here
import Home from "./Home"
import Interface from "./modules/Interface"

//import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/interface">Interface</Link>
          </li>
        </ul>
      </div>
      <hr />
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
