import React from 'react';
import axios from 'axios';
import fileDownload from 'js-file-download'
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import './Interface.css';



class UIHeader extends React.Component {
  render() {
    let path = this.props.path;
    let size;
    if (window.innerWidth < 580) {
      size = 40;
    } else if (window.innerWidth < 1100) {
      size = 70;
    } else {
      size = 90;
    }
    const breadcrumbs = path.map((breadcrumb, index, path) => {
      return (
        <li key={index}>
          <button
            onClick={(e) => this.props.onClick(index)}
          >
            {breadcrumb}
          </button>
        </li>
      );
    });
    return (
      <div className='ui-header'>
        <div className='icon-block'>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width={size} height={size}>
              <g fill="#e6e6e6">
                <path d="m 2.1166667,2.1166667 c -0.1465791,0 -0.2645833,0.1180043 -0.2645833,0.2645833 V 4.7625 5.0270833 5.2916667 h 0.2645833 1.984375 V 4.7625 H 2.3812501 V 2.6458334 H 5.55625 v 1.0474811 0.1431439 h 0.5291667 v -0.396875 -1.179773 c 0,-0.079397 -0.063747,-0.1431437 -0.1431438,-0.1431437 H 5.8208333 Z M 4.365625,3.96875 c -0.07329,0 -0.1322916,0.059002 -0.1322916,0.1322917 v 0.5291666 c 0,0.07329 0.059001,0.1322917 0.1322916,0.1322917 h 2.6458333 c 0.07329,0 0.1322917,-0.059001 0.1322917,-0.1322917 V 4.1010417 C 7.14375,4.0277517 7.084748,3.96875 7.0114583,3.96875 Z M 4.6245241,4.2333334 H 5.297351 c 0.070256,0 0.1266073,0.056352 0.1266073,0.1266073 v 0.011369 c 0,0.070256 -0.056352,0.1266074 -0.1266073,0.1266074 H 4.6245241 c -0.070256,0 -0.1266074,-0.056352 -0.1266074,-0.1266074 v -0.011369 c 0,-0.070256 0.056352,-0.1266073 0.1266074,-0.1266073 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,4.365625 0.13229165,0.13229165 0 0 1 6.35,4.4979167 0.13229165,0.13229165 0 0 1 6.2177083,4.365625 0.13229165,0.13229165 0 0 1 6.3468994,4.2333334 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,4.365625 0.13229165,0.13229165 0 0 1 6.746875,4.4979167 0.13229165,0.13229165 0 0 1 6.6145833,4.365625 0.13229165,0.13229165 0 0 1 6.7437743,4.2333334 Z M 4.365625,4.8947917 c -0.07329,0 -0.1322916,0.059001 -0.1322916,0.1322916 V 5.55625 c 0,0.07329 0.059001,0.1322917 0.1322916,0.1322917 h 2.6458333 c 0.07329,0 0.1322917,-0.059002 0.1322917,-0.1322917 V 5.0270833 c 0,-0.07329 -0.059002,-0.1322916 -0.1322917,-0.1322916 z M 4.6245241,5.159375 H 5.297351 c 0.070256,0 0.1266073,0.056351 0.1266073,0.1266074 v 0.011369 c 0,0.070256 -0.056351,0.1266073 -0.1266073,0.1266073 H 4.6245241 c -0.070256,0 -0.1266074,-0.056352 -0.1266074,-0.1266073 v -0.011369 c 0,-0.070256 0.056351,-0.1266074 0.1266074,-0.1266074 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,5.2916667 0.13229165,0.13229165 0 0 1 6.35,5.4239583 0.13229165,0.13229165 0 0 1 6.2177083,5.2916667 0.13229165,0.13229165 0 0 1 6.3468994,5.159375 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,5.2916667 0.13229165,0.13229165 0 0 1 6.746875,5.4239583 0.13229165,0.13229165 0 0 1 6.6145833,5.2916667 0.13229165,0.13229165 0 0 1 6.7437743,5.159375 Z M 1.4552084,5.55625 c -0.07329,0 -0.1322917,0.059002 -0.1322917,0.1322917 V 5.8208333 5.953125 6.0854167 C 1.3229167,6.2319958 1.4409209,6.35 1.5875001,6.35 H 4.1010417 V 5.8208333 h -0.79375 C 3.2340017,5.8208333 3.175,5.7618313 3.175,5.6885417 V 5.55625 H 1.5875001 Z M 4.365625,5.8208333 c -0.07329,0 -0.1322916,0.059002 -0.1322916,0.1322917 v 0.5291667 c 0,0.073289 0.059001,0.1322916 0.1322916,0.1322916 h 2.6458333 c 0.07329,0 0.1322917,-0.059001 0.1322917,-0.1322916 V 5.953125 c 0,-0.07329 -0.059003,-0.1322917 -0.1322917,-0.1322917 z M 4.6245241,6.0854167 H 5.297351 c 0.070256,0 0.1266073,0.056352 0.1266073,0.1266073 v 0.011369 c 0,0.070256 -0.056351,0.1266074 -0.1266073,0.1266074 H 4.6245241 c -0.070256,0 -0.1266074,-0.056351 -0.1266074,-0.1266074 V 6.212024 c 0,-0.070256 0.056351,-0.1266073 0.1266074,-0.1266073 z m 1.7223753,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.4822917,6.2177083 0.13229165,0.13229165 0 0 1 6.35,6.35 0.13229165,0.13229165 0 0 1 6.2177083,6.2177083 0.13229165,0.13229165 0 0 1 6.3468994,6.0854167 Z m 0.3968749,0 a 0.13229165,0.13229165 0 0 1 0.0031,0 A 0.13229165,0.13229165 0 0 1 6.8791667,6.2177083 0.13229165,0.13229165 0 0 1 6.746875,6.35 0.13229165,0.13229165 0 0 1 6.6145833,6.2177083 0.13229165,0.13229165 0 0 1 6.7437743,6.0854167 Z" transform="scale(1)" className="undefined"/>
              </g>
            </svg>
          </div>
          <div className='connection-circle'></div>
          <div className='connection-line'></div>
          <div className='connection-circle'></div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width={size} height={size}>
              <g fill="#e6e6e6">
                <path d="m 2.1166667,2.1166667 c -0.080872,0 -0.145977,0.064902 -0.145977,0.1455208 v 0.7276042 c 0,0.080619 0.065106,0.1455208 0.145977,0.1455208 h 3.6494252 c 0.080872,0 0.145977,-0.064902 0.145977,-0.1455208 V 2.2621875 c 0,-0.080619 -0.065106,-0.1455208 -0.145977,-0.1455208 z m 2.8556752,0.3643705 a 0.14597699,0.14552081 0 0 1 0.00342,0 A 0.14597699,0.14552081 0 0 1 5.1217403,2.626558 0.14597699,0.14552081 0 0 1 4.9757633,2.7720789 0.14597699,0.14552081 0 0 1 4.8297863,2.626558 0.14597699,0.14552081 0 0 1 4.9723419,2.4810372 Z m 0.4858296,0 a 0.14597699,0.14552081 0 0 1 0.00399,0 A 0.14597699,0.14552081 0 0 1 5.6081401,2.626558 0.14597699,0.14552081 0 0 1 5.4621631,2.7720789 0.14597699,0.14552081 0 0 1 5.3161861,2.626558 0.14597699,0.14552081 0 0 1 5.4581715,2.4810372 Z m -3.1225393,0.072192 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.07276 0,0.04031 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.07276 0.072989,-0.07276 z M 2.1166667,3.2808334 c -0.080872,0 -0.145977,0.064902 -0.145977,0.1455208 v 0.7276041 c 0,0.080619 0.065106,0.1455209 0.145977,0.1455209 H 4.0143678 V 3.6031393 c 0,-0.097818 0.079215,-0.1767851 0.1773393,-0.1767851 h 1.7203618 c 0,-0.080619 -0.065106,-0.1455208 -0.145977,-0.1455208 z M 4.3376841,3.571875 c -0.098124,0 -0.1773393,0.078968 -0.1773393,0.1767851 v 2.5568464 c 0,0.097818 0.079216,0.1767851 0.1773393,0.1767851 h 1.8349765 c 0.098124,0 0.1773393,-0.078968 0.1773393,-0.1767851 V 4.5905208 h -0.729885 c -0.1617434,0 -0.291954,-0.1126485 -0.291954,-0.2523878 V 3.571875 Z m 1.2824308,0 v 0.7276042 h 0.729885 V 4.1658957 L 5.7370106,3.571875 Z M 2.3356322,3.7173958 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.072761 0,0.040309 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.072761 0.072989,-0.072761 z M 2.1411863,4.445 c -0.094349,0 -0.1704966,0.07591 -0.1704966,0.1699637 v 0.6787184 c 0,0.094054 0.076148,0.1699637 0.1704966,0.1699637 H 4.0143678 V 4.445 Z m 0.1944459,0.4365625 h 1.3137931 c 0.040436,0 0.072989,0.032451 0.072989,0.07276 0,0.04031 -0.032553,0.07276 -0.072989,0.07276 H 2.3356322 c -0.040436,0 -0.072989,-0.032451 -0.072989,-0.07276 0,-0.04031 0.032553,-0.07276 0.072989,-0.07276 z" transform="scale(1)" className="undefined"/>
              </g>
            </svg>
          </div>
        </div>
        <div className='navbar'>
          <div className="nav-title">
            Remote File Server
          </div>
          <ul className='breadcrumbs'>
            <li key={-1}>
              <button
                onClick={(e) => this.props.onClick(-1)}
              >
                Home
              </button>
            </li>
            {breadcrumbs}
          </ul>
        </div>
      </div>
    )
  }
}

class FolderPanel extends React.Component {
  render() {
    const folderIcon = <FontAwesomeIcon icon={faFolder} size="4x" />
    const dirList = this.props.contents;
    const dirs = dirList.map((dir) => {
      return (
        <button
          className='folder'
          //onClick={this.props.onClick}
          onClick={(e) => this.props.onClick(dir)}
          key={dir.name}
        >
          <div>{folderIcon}</div>
          <div>{dir.name}</div>
        </button>
      );
    });
    return (
      <div className='folder-panel'>
        {dirs}
      </div>
    )
  }
}

class FilePanel extends React.Component {
  render() {
    const fileIcon = <FontAwesomeIcon icon={faFile} size="4x" />;
    const fileList = this.props.contents;
    if (fileList.length === 0) {
      return (
        <div className='file-panel-empty'>
          <p>No Files Found</p>
        </div>
      )
    }
    const files = fileList.map((file) => {
      let fname = file.name;
      if (fname.length > 15) {
        fname = file.name.substring(0, 15);
      }
      
      let fsize = file.size;
      return (
        <button
          className='file'
          key={file.name}
          onClick={(e) => this.props.onClick(file)}
        >
          <div>{fileIcon}</div>
          <div>{fname}</div>
          <div>{fsize}</div>
        </button>
      );
    });
    return (
      <div className='file-panel'>
        {files}
      </div>
    )
  }
}

class PopUp extends React.Component {
  handleFocus(e) {
    e.target.select();
  }

  render() {
    if (this.props.show === "new-folder") {
      return (
        <form className='popup' onSubmit={(e) => this.props.onSubmit(e)}>
          <div className='popup-modal'>
            <div className='popup-msg'>
              New Folder
            </div>
            <input type='text' name='folderName' placeholder='New-Folder-Name' autoComplete='off' className='popup-input'/>
            <div className='popup-buttons'>
              <button type='submit'>
                Create
              </button>
              <button onClick={(e) => this.props.onClick(e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )
    } else if (this.props.show === "rename") {
      return (
        <form className='popup' onSubmit={(e) => this.props.onSubmit(e)}>
          <div className='popup-modal'>
            <div className='popup-msg'>
              Rename
            </div>
            <input type='text' name='newName' defaultValue={this.props.fileName} autoComplete='off' onFocus={this.handleFocus} className='popup-input'/>
            <div className='popup-buttons'>
              <button>
                Rename
              </button>
              <button onClick={(e) => this.props.onClick(e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )
    } else if (this.props.show === "delete") {
      return (
        <form className='popup' onSubmit={(e) => this.props.onSubmit(e)}>
          <div className='popup-modal'>
            <div className='popup-msg-small'>
              Are you sure you want to delete this file?
            </div>
            <div className='popup-buttons'>
              <button>
                Delete
              </button>
              <button onClick={(e) => this.props.onClick(e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )
    } else if (this.props.show === "move") {
      return (
        <form className='popup' onSubmit={(e) => this.props.onSubmit(e)}>
          <div className='popup-modal'>
            <div className='popup-msg-small'>
              Enter absolute file path:
            </div>
            <input type='text' name='absPath' defaultValue={this.props.absPath} onFocus={this.handleFocus} autoComplete='off' className='popup-input'/>
            <div className='popup-buttons'>
              <button>
                Move
              </button>
              <button onClick={(e) => this.props.onClick(e)}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )
    } else if (this.props.show == null){
      return null;
    } else {
      return (
        <form className='popup'>
          <div className='popup-modal'>
            <div className='popup-msg-small'>
              {this.props.show}
            </div>
            <div className='popup-buttons'>
              <button onClick={(e) => this.props.onClick(e)}>
                Close
              </button>
            </div>
          </div>
        </form>
      )
    }
  }
}

/*class FileUpload extends React.Component {
  
  handleUploadFile(e) {
    const hiddenFileUpload = React.useRef(null);
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a drive
    if (this.props.currFile.name === "") {
      //this.setState({
      //  popup: "You must select a drive to upload a file."
      //})
      console.log("Popup for fail to upload.");
    } else {
      console.log("Upload file");
      hiddenFileUpload.current.click();
    }
  }
  
  render() {
    const uploadIcon = <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" />
    return (
      <>
      <button onClick={handleUploadFile}>
        <div>{uploadIcon}</div>
        <div>Upload File</div>
      </button>
      <input type='file'
             ref={hiddenFileUpload}
             onChange={(e) => this.props.handleUploadChange(e)}
             style={{display:'none'}}/>
      </>
    )
  }
}*/
const FileUpload = (props) => {

  const uploadIcon = <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" />
  const hiddenFileUpload = React.useRef(null);
  
  const handleUploadFile = e => {
    console.log("Upload file");
    console.log("Props: " + JSON.stringify(props));
    console.log("Func: " + props.handleUpload);
    hiddenFileUpload.current.click();
  }

  const handleChange = e => {
    const upFile = e.target.files[0];
    props.handleUpload(upFile);
  }
  /*const handleUploadChange = (fp, e) => {
    console.log("handleUpload: " + JSON.stringify(fp));
    const upFile = e.target.files[0];
    console.log(upFile);
    const currPath = fp.currPath;
    console.log("cp: " + currPath);
    const newPath = fp.currPath.concat([upFile.name]);
    const formData = new FormData();
    formData.append('file', upFile)
    axios.post('http://192.168.1.100:4000/uploadFile', formData)
    .then(res => {
      axios.get('http://192.168.1.100:4000/moveFile',  {
        params: {
          oldFilePath: './'.concat(upFile.name),
          newFilePath: newPath.join('/'),
          currFilePath: currPath.join('/'),
        }
      });
    }).then(res => {
      console.log("Uploaded file")
    });
  }*/

  return (
    <>
      <button onClick={handleUploadFile}>
        <div>{uploadIcon}</div>
        <div>Upload File</div>
      </button>
      <input type='file'
             ref={hiddenFileUpload}
             onChange={handleChange}
             style={{display:'none'}}/>
    </>
  )
}

class Interface extends React.Component {
  /* Interface component constructor */
  constructor(props) {
    super(props);
    this.handleCrumbClick = this.handleCrumbClick.bind(this);
    this.handleFolderClick = this.handleFolderClick.bind(this);
    this.handleFileClick = this.handleFileClick.bind(this);
    this.handleNewFolder = this.handleNewFolder.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleRename = this.handleRename.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handlePopupButtonClick = this.handlePopupButtonClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      filePath: [],
      contents: [],
      popup: null,
      currFile: {
        name: "",
        isFolder: false,
        size: "",
        lastMod: "",
      },
    }
  }

  /* When the component mounts, get the drives from the server */
  componentDidMount() {
    // Define drives in case an error occurs
    let drives;
    // Get drives on remote server
    axios.get('http://192.168.1.100:4000/getDrives').then(res => {
      drives = res.data;
      this.setState({
        contents: drives,
      });
    }).catch(error => {
      console.log("Interface.componentDidMount Error: " + error);
    });
  }

  /* Handler for a breadcrumb being clicked */
  handleCrumbClick(depth) {
    if (depth === -1) {
      let drives;
      axios.get('http://192.168.1.100:4000/getDrives').then(res => {
        drives = res.data;
        this.setState({
          filePath: [],
          contents: drives,
          currFile: {
            name: "",
            isFolder: false,
            size: "",
            lastMod: "",
          }
        });
      }).catch(error => {
        console.log("Interface.handleCrumbClick Error: " + error);
      });
    } else {
      let filePath = this.state.filePath;
      let newFilePath = filePath.slice(0, depth+1);
      let fp = newFilePath.join('/');
      let files;
      axios.get('http://192.168.1.100:4000/getFiles', {
        params: {
          folder: fp
        }
      }).then(res => {
        files = res.data;
        this.setState({
          filePath: newFilePath,
          contents: files,
          currFile: {
            name: newFilePath[newFilePath.length-1],
            isFolder: true,
            size: "",
            lastMod: "",
          }
        });
      }).catch(error => {
        console.log("Interface.handleCrumbClick Error: " + error);
      });
    }
  }

  /* Handler for a folder being clicked */
  handleFolderClick(folder) {
    let filePath = this.state.filePath;
    filePath.push(folder.name);
    let fp = filePath.join('/');
    let files;
    axios.get('http://192.168.1.100:4000/getFiles', {
      params: {
        folder: fp
      }
    }).then(res => {
      files = res.data;
      this.setState({
        filePath: filePath,
        contents: files,
        currFile: {
          name: folder.name,
          isFolder: true,
          size: "",
          lastMod: "",
        }
      });
    }).catch(error => {
      console.log("Interface.handleFolderClick Error: " + error);
    });
  }

  /* Hanlder for a file being clicked */
  handleFileClick(file) {
    let filePath = this.state.filePath;
    console.log("fp: " + filePath);
    console.log("fn: " + JSON.stringify(file));
    this.setState({
      currFile: {
        name: file.name,
        isFolder: false,
        size: file.size,
        lastMod: file.lastMod,
      }
    });
  }

  /* Handler for the 'New Folder' button being clicked */
  handleNewFolder() {
    const currFile = this.state.currFile.name;
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a drive
    if (currFile === "") {
      this.setState({
        popup: "You must select a drive to create a new folder."
      })
    } else {
      this.setState({
        popup: "new-folder",
      });
    }
  }

  handleUpload(upFile) {
    const currPath = this.state.filePath;
    //const upFile = e.target.files[0];
    const newPath = currPath.concat([upFile.name]);
    const formData = new FormData();
    formData.append('file', upFile)
    axios.post('http://192.168.1.100:4000/uploadFile', formData)
    .then(res => {
      axios.get('http://192.168.1.100:4000/moveFile',  {
        params: {
          oldFilePath: './'.concat(upFile.name),
          newFilePath: newPath.join('/'),
          currFilePath: currPath.join('/'),
        }
      }).then(res2 => {
      console.log("Uploaded file")
      console.log("res: " + res2);
      console.log("res2: " + JSON.stringify(res2));
      let files = res2.data;
        if (typeof files !== "string") {
          this.setState({
            filePath: currPath,
            contents: files,
            popup: "Successfully uploaded: " + upFile.name,
            currFile: {
              name: currPath[currPath.length-1],
              isFolder: true,
              size: "",
              lastMod: "",
            },
          });
        } else {
          console.log("FAILED TO MOVE UPLOADED FILE");
          this.setState({
            popup: files,
          });
        }
    });
    });
  }

  /* Handler for the 'Download' button being clicked */
  handleDownload() {
    const currFile = this.state.currFile;
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a drive
    if (currFile.name === "") {
      this.setState({
        popup: "You must select a file or folder to download it."
      })
    } else {
      // Download the file
      console.log("Download file");
      let filePath = this.state.filePath;
      console.log("fp: " + filePath);
      console.log("fn: " + currFile.name);
      axios.get('http://192.168.1.100:4000/downloadFile', {
        responseType: 'blob',
        params: {
          path: filePath,
          file: currFile.name,
        }
      }).then(res => {
        fileDownload(res.data, currFile.name);
      }).catch(error => {
        console.log("Interface.handleDownload Error: " + error);
      });
    }
  }

  /* Handler for the 'Delete' button being clicked */
  handleDelete() {
    const currFile = this.state.currFile;
    const filePath = this.state.filePath;
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a file
    if (currFile.name === "") {
      this.setState({
        popup: "You must select a file or folder to delete."
      })
    } else if (filePath.length < 2 && currFile.isFolder) {
      this.setState({
        popup: "You cannot delete a hard drive."
      })
    } else {
      this.setState({
        popup: "delete",
      });
    }
  }

  /* Handler for the 'Rename' button being clicked */
  handleRename() {
    const currFile = this.state.currFile;
    const filePath = this.state.filePath;
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a file
    if (currFile.name === "") {
      this.setState({
        popup: "You must select a file or folder to rename."
      })
    } else if (filePath.length < 2 && currFile.isFolder) {
      this.setState({
        popup: "You cannot rename a hard drive."
      })
    } else {
      this.setState({
        popup: "rename",
      });
    }
  }

  /* Handler for the 'Move' button being clicked */
  handleMove() {
    const currFile = this.state.currFile;
    const filePath = this.state.filePath;
    // If there is not a current file, then the user is at the 'root' level,
    // and still needs to select a file
    if (currFile.name === "") {
      this.setState({
        popup: "You must select a file or folder to move."
      })
    } else if (filePath.length < 2 && currFile.isFolder) {
      this.setState({
        popup: "You cannot move a hard drive."
      })
    } else {
      this.setState({
        popup: "move",
      });
    }
  }

  /* Handler for submitting the popup form */
  handlePopupButtonClick(e) {
    // Prevent default action
    e.preventDefault();
    // Depending on the popup status, do something different
    const pop = this.state.popup;

    if (pop === "new-folder") {
      // If the popup is for a new folder, try to make one
      let filePath = this.state.filePath;
      axios.get('http://192.168.1.100:4000/createFolder', {
        params: {
          filePath: filePath,
          folderName: e.target.folderName.value,
        }
      }).then(res => {
        let files = res.data;
        if (typeof files !== "string") {
          this.setState({
            contents: files,
            popup: "Successfully created folder: " + e.target.folderName.value,
          });
        } else {
          console.log("FAILED TO MAKE FOLDER");
          this.setState({
            popup: files,
          });
        }
      }).catch(error => {
        console.log("Interface.handlePopupButtonClick Error: " + error);
        this.setState({
          popup: "Unable to connect to server.",
        });
      });
    } else if (pop === "rename") {
      // If the popup is for renaming a file, try to
      let currFile = this.state.currFile;
      let filePath;
      let newFilePath;
      if (currFile.isFolder) {
        filePath = this.state.filePath.slice(0, this.state.filePath.length-1);
        newFilePath = filePath.concat(e.target.newName.value);
      } else {
        filePath = this.state.filePath;
        newFilePath = filePath;
      }
      axios.get('http://192.168.1.100:4000/renameFile', {
        params: {
          filePath: filePath,
          newFilePath: newFilePath,
          oldName: currFile.name,
          newName: e.target.newName.value,
        }
      }).then(res => {
        let files = res.data;
        console.log("f: " + files);
        if (typeof files !== "string") {
          this.setState({
            filePath: newFilePath,
            contents: files,
            popup: "Successfully renamed: " + e.target.newName.value,
            currFile: {
              name: newFilePath[newFilePath.length-1],
              isFolder: true,
              size: "",
              lastMod: "",
            },
          });
        } else {
          console.log("FAILED TO RENAME FILE");
          this.setState({
            popup: files,
          });
        }
      }).catch(error => {
        console.log("Interface.handlePopupButtonClick Error: " + error);
        this.setState({
          popup: "Unable to connect to server.",
        });
      });
    } else if (pop === "delete") {
      let currFile = this.state.currFile;
      let filePath;
      if (currFile.isFolder) {
        filePath = this.state.filePath.slice(0, this.state.filePath.length-1);
      } else {
        filePath = this.state.filePath;
      }
      axios.get('http://192.168.1.100:4000/deleteFile', {
        params: {
          filePath: filePath,
          fileName: currFile.name,
          isFolder: currFile.isFolder,
        }
      }).then(res => {
        let files = res.data;
        console.log("f: " + files);
        if (typeof files !== "string") {
          this.setState({
            filePath: filePath,
            contents: files,
            popup: "Successfully deleted: " + currFile.name,
            currFile: {
              name: filePath[filePath.length-1],
              isFolder: true,
              size: "",
              lastMod: "",
            },
          });
        } else {
          this.setState({
            popup: files,
          })
          console.log("FAILED TO DELETE FILE");
        }
      }).catch(error => {
        console.log("Interface.handlePopupButtonClick Error: " + error);
        this.setState({
          popup: "Could not establish connection to server."
        })
      });
    } else if (pop === "move") {
      let currFile = this.state.currFile;
      let filePath = this.state.filePath;
      let oldFilePath;
      let newFilePath = e.target.absPath.value;
      if (currFile.isFolder) {
        oldFilePath = filePath.slice(0, filePath.length-1);
      } else {
        oldFilePath = filePath;
      }
      axios.get('http://192.168.1.100:4000/moveFile', {
        params: {
          oldFilePath: oldFilePath.concat([currFile.name]).join('/'),
          newFilePath: newFilePath,
          currFilePath: filePath.join('/'),
        }
      }).then(res => {
        let files = res.data;
        if (typeof files !== "string") {
          this.setState({
            filePath: filePath,
            contents: files,
            popup: "Successfully moved: " + currFile.name,
            currFile: {
              name: filePath[filePath.length-1],
              isFolder: true,
              size: "",
              lastMod: "",
            },
          });
        } else {
          console.log("FAILED TO MOVE FILE");
          this.setState({
            popup: files,
          });
        }
      }).catch(error => {
        console.log("Interface.handlePopupButtonClick Error: " + error);
        this.setState({
          popup: "Unable to connect to server.",
        });
      });
    } else {
      console.log("Unknown state!");
    }
  }

  /* Handler for the popup 'Cancel' button being clicked */
  handleClose(e) {
    e.preventDefault();
    this.setState({
      popup: null,
    });
  }

  /* Render the folder and file panels */
  renderPanels(files) {
    let dirList = [];
    let fileList = [];
    if (typeof files !== "undefined") {
      files.forEach((f) =>{
        // Separate out the folders and files
        if (f.isFolder) {
          dirList.push(f);
        } else if (!f.isFolder) {
          fileList.push(f);
        } else {
          console.log("renderPanels: Unknown file type.");
        }
      });
    };
    return (
      <div className='ui-contents'>
        <FolderPanel
          contents={dirList}
          //onClick={(folderName) => this.handleClick(folderName)}
          onClick={this.handleFolderClick}
        />
        <FilePanel
          contents={fileList}
          onClick={this.handleFileClick}
        />
      </div>
    )
  }
  
  /* Render the file data in the bottom panel */
  renderFileData() {
    const file = this.state.currFile;
    if (file.name === "") {
      return (
        <div className='file-data-empty'>
          <p>No File Selected</p>
        </div>
      )
    }
    let fileIcon;
    let fileSize;
    let fileMod;
    if (file.isFolder) {
      fileIcon = <FontAwesomeIcon icon={faFolder} size="5x" />
      //fileMod = "Created: " + file.lastMod;
    } else {
      //let fileParts = file.name.split(".");
      //let fileExt = fileParts[fileParts.length(-1)];
      // TODO: Add logic for different file extensions
      fileIcon = <FontAwesomeIcon icon={faFile} size="4x" />;
      fileSize = "Size: " + file.size;
      fileMod = "Created: " + file.lastMod;
    }

    return (
      <div className='file-data'>
        <div>
          {fileIcon}
        </div>
        <div className='fileinfo'>
          <div className='filename'>
            {file.name}
          </div>
          <div className='file-stats'>
            <div>
              {fileSize}
            </div>
            <div>
              {fileMod}
            </div>
          </div>
        </div>
      </div>
    )
  }

  /* Overall render method */
  render() {
    const folderIcon = <FontAwesomeIcon icon={faFolder} size="1x" />
    const uploadIcon = <FontAwesomeIcon icon={faCloudUploadAlt} size="1x" />
    const trashIcon = <FontAwesomeIcon icon={faTrashAlt} size="1x" />
    const editIcon = <FontAwesomeIcon icon={faEdit} size="1x" />
    const files = this.state.contents;
    const showPopup = this.state.popup;
    const filePath = this.state.filePath;
    const currFile = this.state.currFile;
    const absPath = filePath.concat(currFile.name).join('/');

    return (
      <div className='ui'>
        <UIHeader
          path={filePath}
          onClick={this.handleCrumbClick}
        />
        <PopUp
          show={showPopup}
          fileName={currFile.name}
          absPath={absPath}
          onSubmit={this.handlePopupButtonClick}
          onClick={this.handleClose}
        />
        {this.renderPanels(files)}
        <div className='bottom-panel'>
          <div className='folder-panel-bottom'>
            <button onClick={this.handleNewFolder}>
              <div>{folderIcon}</div>
              <div>New Folder</div>
            </button>
            {/*<button onClick={this.handleUploadFile}>
              <div>{uploadIcon}</div>
              <div>Upload File</div>
            </button>
            <input type='file' style={{display:'none'}}/>*/}
            <FileUpload
              currFile={currFile}
              handleUpload={this.handleUpload}
            />
          </div>
          <div className='file-panel-bottom'>
            {this.renderFileData()}
            <div className='file-buttons'>
              <button onClick={this.handleDownload}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width='40px' height='40px'>
                  <g fill="#32506e">
                  <path
                      d="M 14.767578 7.5 C 14.065845 7.5 13.5 8.0658446 13.5 8.7675781 L 13.5 15 L 9.75 15 L 16 22.5 L 22.25 15 L 18.5 15 L 18.5 8.7675781 C 18.5 8.0658446 17.934155 7.5 17.232422 7.5 L 14.767578 7.5 z M 5.7148438 21 C 5.5961326 21.000002 5.5 21.096129 5.5 21.214844 L 5.5 23.785156 C 5.5 23.812596 5.5199614 23.831382 5.5292969 23.855469 C 5.5219268 23.904622 5.5 23.948731 5.5 24 C 5.5 24.554 5.9460003 25 6.5 25 L 25.5 25 C 26.054 25 26.5 24.554 26.5 24 C 26.5 23.931417 26.473958 23.871274 26.460938 23.806641 C 26.473108 23.774817 26.5 23.751059 26.5 23.714844 L 26.5 21.285156 C 26.5 21.12687 26.37313 21 26.214844 21 L 24.785156 21 C 24.62687 21.000001 24.5 21.12687 24.5 21.285156 L 24.5 23 L 7.5 23 L 7.5 21.214844 C 7.5 21.096133 7.4038712 21 7.2851562 21 L 5.7148438 21 z "
                      transform="scale(0.26458333)" />
                  </g>
                </svg>
                <div>Download</div>
              </button>
              <button onClick={this.handleDelete}>
                <div>{trashIcon}</div>
                <div>Delete</div>
              </button>
            </div>
            <div className='file-buttons'>
              <button onClick={this.handleRename}>
                <div>{editIcon}</div>
                <div>Rename</div>
              </button>
              <button onClick={this.handleMove}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8.5 8.5" width='40px' height='40px'>
                  <g fill="#32506e">
                    <path
                      id="rect30"
                      d="M 6.5 6.5 C 5.6689998 6.5 5 7.1689998 5 8 L 5 25 C 5 25.831 5.6689998 26.5 6.5 26.5 L 18.5 26.5 C 19.331 26.5 20 25.831 20 25 L 20 19.5 L 14 19.5 C 13.722998 19.5 13.5 19.277 13.5 19 L 13.5 16 C 13.5 15.722998 13.723 15.5 14 15.5 L 20 15.5 L 20 13 L 14.5 13 C 13.946 13 13.5 12.554 13.5 12 L 13.5 6.5 L 6.5 6.5 z M 14.5 6.5 L 14.5 12 L 20 12 L 20 11.417969 L 15.013672 6.5 L 14.5 6.5 z "
                      transform="scale(0.26458333)" />
                    <path
                      id="rect895"
                      d="m 3.8364585,4.2333336 h 1.8520833 c 0.07329,0 0.1322916,0.059002 0.1322916,0.1322916 v 0.5291667 c 0,0.07329 -0.059002,0.1322917 -0.1322916,0.1322917 H 3.8364585 c -0.07329,0 -0.1322916,-0.059002 -0.1322916,-0.1322917 V 4.3656252 c 0,-0.07329 0.059002,-0.1322916 0.1322916,-0.1322916 z" />
                    <path
                      id="path897"
                      d="m 7.2760419,4.6302085 -1.5875,0.9165435 V 3.713665 Z" />
                  </g>
                </svg>
                <div>Move</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Interface;
