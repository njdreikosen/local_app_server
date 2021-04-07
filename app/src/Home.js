import React from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './css/Home.css';
import { NavLink } from 'react-router-dom';

class Home extends React.Component {
  /* Home Page component constructor */
  constructor(props) {
    super(props);
    this.state = {
      apps: [],
    }
  }

  /* When the component mounts, get the drives from the server */
  componentDidMount() {
    /*/ Define drives in case an error occurs
    let drives;
    // Get drives on remote server
    axios.get('http://192.168.1.100:4000/getDrives').then(res => {
      drives = res.data;
      this.setState({
        contents: drives,
      });
    }).catch(error => {
      console.log("Interface.componentDidMount Error: " + error);
    });*/
  }

  /* Overall render method */
  render() {
    return (
      <div className='module-panel'>
        <NavLink
          className='module-button'
          to='/interface'
        >
          Remote File Server
        </NavLink>
      </div>
    )
  }
}

export default Home;
