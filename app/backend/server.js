const express = require('express');
const filesystem = require('./filesystem');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const rfsRoutes = express.Router();
//const mongoose = require('mongoose');
const PORT = 4000;

//let rfs = require('./rfs.model');

app.use(cors())
app.use(bodyParser.json());

//mongoose.connect('mongodb://127.0.0.1:27017/remote-file-server', { useNewUrlParser: true });
//const connection = mongoose.connection;

//connection.once('open', function() {
//    console.log("MongoDB database connection established successfully");
//});

rfsRoutes.route('/').get(function(req, res) {
    res.json({});
});

rfsRoutes.route('/createFolder').get(function(req, res) {
    let newFiles = filesystem.createFolder(req.query.filePath, req.query.folderName);
    res.json(newFiles);
});

rfsRoutes.route('/renameFile').get(function(req, res) {
    let newFiles = filesystem.renameFile(req.query.filePath, req.query.newFilePath, req.query.oldName, req.query.newName);
    res.json(newFiles);
});

rfsRoutes.route('/deleteFile').get(function(req, res) {
    let newFiles = filesystem.deleteFile(req.query.filePath, req.query.fileName, req.query.isFolder);
    res.json(newFiles);
});

rfsRoutes.route('/moveFile').get(function(req, res) {
    let newFiles = filesystem.moveFile(req.query.filePath, req.query.newFilePath, req.query.oldName, req.query.newName);
    res.json(newFiles);
});

rfsRoutes.route('/getDrives').get(async function(req, res) {
    const drives = await filesystem.getDrives();
    console.log("DRIVES: " + drives);
    res.json(drives);
});

rfsRoutes.route('/getFiles').get(function(req, res) {
    console.log("params: " + req.query.folder);
    let files = filesystem.getFiles(req.query.folder);
    console.log("FILES: " + JSON.stringify(files));
    res.json(files);
});

rfsRoutes.route('/downloadFile').get(function(req, res) {
    let filePath = req.query.path;
    filePath.push(req.query.file);
    let fp = filePath.join('/');
    console.log("fp: " + fp);
    res.download(fp, req.query.file);
});

app.use('/', rfsRoutes);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});