const express = require('express');
const db = require('./database');
const filesystem = require('./filesystem');
//const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = express.Router();
const multer = require('multer');
const PORT = 4000;

/* General setup */
app.use(cors())
app.use(bodyParser.json());

/* File Server storage setup */
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});
var uploadDisk = multer({ storage: storage });

/* Home route */
routes.route('/').get(function(req, res) {
    res.json({});
});

/*===========================================================================*/
/*                              Database Routes                              */
/*===========================================================================*/
routes.route('/insertEvent').post(function(req, res) {
    let eventName = req.body.name;
    let eventDate = req.body.date;
    let eventHash = db.hashStrings(eventName, eventDate);
    let queryString = `INSERT INTO events (eID, eName, eDate) VALUES ('${eventHash}', '${eventName}', '${eventDate}')`;
    console.log("insertEventQuery: " + queryString);
    db.insertRow(queryString).then(rows => {
        res.json(rows);
    });
});

routes.route('/getMonth').get(function(req, res) {
    let month = req.query.month;
    let year = req.query.year;
    let queryString = `SELECT eName, eDate FROM events WHERE eDate LIKE '${month}__${year}' OR eDate LIKE '${month}__....'`;
    console.log("getMonthQuery: " + queryString);
    db.getRows(queryString).then(rows => {
        res.json(rows);
    });
});

/*===========================================================================*/
/*                         Remote File Server Routes                         */
/*===========================================================================*/

routes.route('/getModules').get(function(req, res) {
    let mods = filesystem.getModules();
    res.json(mods);
});

routes.route('/createFolder').get(function(req, res) {
    let newFiles = filesystem.createFolder(req.query.filePath, req.query.folderName);
    res.json(newFiles);
});

routes.route('/renameFile').get(function(req, res) {
    let newFiles = filesystem.renameFile(req.query.filePath, req.query.newFilePath, req.query.oldName, req.query.newName);
    res.json(newFiles);
});

routes.route('/deleteFile').get(function(req, res) {
    let newFiles = filesystem.deleteFile(req.query.filePath, req.query.fileName, req.query.isFolder);
    res.json(newFiles);
});

routes.route('/moveFile').get(function(req, res) {
    let newFiles = filesystem.moveFile(req.query.oldFilePath, req.query.newFilePath, req.query.currFilePath);
    console.log(newFiles);
    res.json(newFiles);
});

routes.route('/getDrives').get(async function(req, res) {
    const drives = await filesystem.getDrives();
    console.log("DRIVES: " + drives);
    res.json(drives);
});

routes.route('/getFiles').get(function(req, res) {
    console.log("params: " + req.query.folder);
    let files = filesystem.getFiles(req.query.folder);
    console.log("FILES: " + JSON.stringify(files));
    res.json(files);
});

routes.route('/downloadFile').get(function(req, res) {
    let isFolder = req.query.isFolder;
    let filePath = req.query.path;
    let fileName = req.query.file;
    let fp;
    if (isFolder) {
        fp = filePath.join('/');
        console.log("CURR DIR: " + __dirname);
        zipFP = [__dirname, "tmp", fileName + ".zip"].join('/');
        console.log("zipFP: " + zipFP);
        let fileZipped = filesystem.compressFiles(fp, fileName, zipFP);
        if (!fileZipped) {
            console.log("FAILED TO ZIP FILES!!");
            res.json("Failed to zip files.");
        }
        fp = zipFP;
    } else {
        filePath.push(fileName);
        fp = filePath.join('/');
    }
    console.log("fp: " + fp);
    res.download(fp, req.query.file);
});

routes.route('/uploadFile').post(uploadDisk.single('file'), function(req, res) {
    console.log("File uploaded to disk")
    res.send("Success")
});

app.use('/', routes);

const appServer = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

function GracefulShutdown() {
    console.log("Closing server gracefully...");

    appServer.close(() => {
        console.log("Server closing...");
        /*connectionPool.end(function(err) {
            if (err) {
                console.log("DBerror: " + err);
            } else {
                console.log("Closed DB connections")
            }
            process.exit(0);
        })*/
        db.closeDatabase(function() {
            console.log("Server closed.");
            process.exit(0);
        })
    })
}

process.on('SIGTERM', GracefulShutdown);
process.on('SIGINT', GracefulShutdown);
process.on('SIGHUP', GracefulShutdown);
