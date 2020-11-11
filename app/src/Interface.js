import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'

import logo from './logo.svg';
import './Interface.css';

class Folder extends React.Component {
  render() {
    const folderIcon = <FontAwesomeIcon icon={faFolder} size="4x" />
    return (
      <button className='folder'>
        <div>{folderIcon}</div>
        <div>FolderName</div>
      </button>
    )
  }
}

class FolderPanel extends React.Component {
  render() {
    return (
      <div className='folder-panel'>
        <Folder />
      </div>
    )
  }
}

class File extends React.Component {
  render() {
    return (
      <div>
        This is a file
      </div>
    )
  }
}

class FilePanel extends React.Component {
  render() {
    return (
      <div className='file-panel'>
        <p>Files go here</p>
      </div>
    )
  }
}

class Interface extends React.Component {
  render() {
    return (
      <div className='ui'>
        <div className='interface-header'>
          Remote File Server
        </div>
        <div className='interface'>
          <FolderPanel />
          <FilePanel />
        </div>
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Interface;
