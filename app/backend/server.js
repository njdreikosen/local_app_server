/* External Imports */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const multer = require('multer');

/* Internal imports */
const db = require('./database');
const filesystem = require('./filesystem');

/* General setup */
const app = express();
const routes = express.Router();
const PORT = 4000;
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

/*===========================================================================*/
/*                         General and Login Routes                          */
/*===========================================================================*/
routes.route('/').get(function(req, res) {
    res.json({});
});

routes.route('/login').post(function(req, res) {
    db.authenticateUser(req.body.credentials).then(valid => {
        if (valid) {
            const userToken = db.generateToken(req.body.credentials.username);
            res.send({
                token: userToken
            });
        } else {
            res.sendStatus(401);
        }
    });
});

routes.route('/signup').post(function(req, res) {
    let credentials = req.body.credentials;
    let salt = db.genBytes();
    let queryString = `INSERT INTO users (uName, uSalt, uPassword) VALUES (?, ?, ?)`;
    let vals = [credentials.username, salt, db.hashStrings(salt, db.hashStrings(salt, credentials.password))];
    db.insertRow(queryString, vals).then(rows => {
        if (typeof(rows) === 'string') {
            res.sendStatus(401);
        }
        const userToken = db.generateToken(req.body.credentials.username);
        res.send({
            token: userToken
        });
    }).catch(err => {
        console.log("signupErr: " + err);
    });
});


/*===========================================================================*/
/*                              Database Routes                              */
/*===========================================================================*/
routes.route('/getMonth').get(db.authenticateToken, function(req, res) {
    let month = req.query.month;
    let year = req.query.year;
    let eUID = JSON.parse(db.decodeBase64(req.headers.authorization.split(' ')[1].split('.')[1])).user;
    let queryString = `SELECT eName, eDate FROM events WHERE (eDate LIKE ? OR eDate LIKE ?) AND (eUID = '' OR eUID = ?)`;
    let vals = [month + "__" + year, month + "__....", eUID];
    db.getRows(queryString, vals).then(rows => {
        res.json(rows);
    });
});

routes.route('/insertEvent').post(db.authenticateToken, function(req, res) {
    let eventName = req.body.name;
    let eventDate = req.body.date;
    let eventHash = db.hashStrings(eventName, eventDate);
    let eventUID = JSON.parse(db.decodeBase64(req.headers.authorization.split(' ')[1].split('.')[1])).user;
    let queryString = `INSERT INTO events (eID, eName, eDate, eUID) VALUES (?, ?, ?, ?)`;
    let vals = [eventHash, eventName, eventDate, eventUID];
    db.insertRow(queryString, vals).then(rows => {
        res.json(rows);
    });
});


/*===========================================================================*/
/*                         Remote File Server Routes                         */
/*===========================================================================*/
routes.route('/createFolder').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let newFiles = filesystem.createFolder(req.query.filePath, req.query.folderName);
    res.json(newFiles);
});

routes.route('/deleteFile').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let newFiles = filesystem.deleteFile(req.query.filePath, req.query.fileName, req.query.isFolder);
    res.json(newFiles);
});

routes.route('/downloadFile').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let isFolder = req.query.isFolder;
    let filePath = req.query.path;
    let fileName = req.query.file;
    let fp;
    if (isFolder) {
        fp = filePath.join('/');
        zipFP = [__dirname, "tmp", fileName + ".zip"].join('/');
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
    res.download(fp, req.query.file);
});

routes.route('/getDrives').get(db.authenticateToken, db.checkUserAccess, async function(req, res) {
    const drives = await filesystem.getDrives();
    res.json(drives);
});

routes.route('/getFiles').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let files = filesystem.getFiles(req.query.folder);
    res.json(files);
});

routes.route('/getModules').get(db.authenticateToken, function(req, res) {
    let mods = filesystem.getModules();
    res.json(mods);
});

routes.route('/moveFile').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let newFiles = filesystem.moveFile(req.query.oldFilePath, req.query.newFilePath, req.query.currFilePath);
    res.json(newFiles);
});

routes.route('/renameFile').get(db.authenticateToken, db.checkUserAccess, function(req, res) {
    let newFiles = filesystem.renameFile(req.query.filePath, req.query.newFilePath, req.query.oldName, req.query.newName);
    res.json(newFiles);
});

routes.route('/uploadFile').post(db.authenticateToken, db.checkUserAccess, uploadDisk.single('file'), function(req, res) {
    console.log("File uploaded to disk")
    res.send("Success")
});

app.use('/', routes);

const appServer = app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});


/*===========================================================================*/
/*                    Graceful Shutdown Functionality                        */
/*===========================================================================*/
// Gracefully shutdown the Express server
function GracefulShutdown() {
    console.log("Closing server gracefully...");
    appServer.close(() => {
        console.log("Server closing...");
        db.closeDatabase().then(res => {
            console.log("Server closed.");
            process.exit(0);
        });
    })
}
// When the server receieves a shutdown signal, gracefully shutdown the server
process.on('SIGTERM', GracefulShutdown);
process.on('SIGINT', GracefulShutdown);
process.on('SIGHUP', GracefulShutdown);
