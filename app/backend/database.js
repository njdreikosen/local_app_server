const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const mysql = require("mysql2");


// Create the pool of connections, and wrap them in the promise wrapper
const connectionPool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'remote_server',
    password: 'remote_server',
    database: 'remote_server'
});
const pool = connectionPool.promise();
// Initialize the database
initDB();

/* Get API Key */
API_KEY = process.env.LAS_API_KEY;
console.log("API KEY: " + API_KEY);


async function closeDatabase() {
    try {
        console.log("Closing database connections... ");
        await pool.end();
        console.log("Database connections closed.");
    } catch (err) {
        console.log("Could not close database connections due to error: " + err);
    }
    return true;
}

async function initDB() {
    // Create the users table if it isn't already created
    try {
        await pool.query("CREATE TABLE users (uName varchar(50) NOT NULL, uSalt char(32) NOT NULL, uPassword char(44) NOT NULL, PRIMARY KEY (uName))");
    } catch (err) {
        console.log("Event Table already created: " + err);
    }
    // Create the events table if it isn't already created. If it isn't also add common events
    try {
        await pool.query("CREATE TABLE events (eID char(44) NOT NULL, eName varchar(25) NOT NULL, eDate char(8) NOT NULL, eUID varchar(44), PRIMARY KEY (eID))");
        // Common events to add
        let commonEvents = [{eName: "New Year's Day", eDate: "0001...."},
                            {eName: "Valentine's Day", eDate: "0114...."},
                            {eName: "St. Patrick's Day", eDate: "0217...."},
                            {eName: "April Fool's Day", eDate: "0301...."},
                            {eName: "Cinco de Mayo", eDate: "0405...."},
                            {eName: "Independence Day", eDate: "0604...."},
                            {eName: "Halloween", eDate: "0931...."},
                            {eName: "Chirstmas Eve", eDate: "1124...."},
                            {eName: "Christmas", eDate: "1125...."},
                            {eName: "New Year's Eve", eDate: "1131...."}];

        // Loop through common events, and add them to the events table
        let eventHash, eventName, eventDate, eventInsert;
        for (let i = 0; i < commonEvents.length; i ++) {
            eventName = commonEvents[i].eName;
            eventDate = commonEvents[i].eDate;
            eventHash = hashStrings(eventName, eventDate);
            eventInsert = `INSERT INTO events (eID, eName, eDate, eUID) VALUES ('${eventHash}', '${eventName}', '${eventDate}', '')`;
            console.log(eventInsert);
            try {
                await pool.execute('INSERT INTO events (eID, eName, eDate, eUID) VALUES (?, ?, ?, ?)', [eventHash, eventName, eventDate, '']);
            } catch (insertErr) {
                console.log("InsertErr: " + insertErr);
            }
        }
    } catch (err) {
        console.log("Event Table already created: " + err);
    }
    return;
}

async function getRows(queryString) {
    try {
        let [rows, fields] = await pool.execute(queryString);
        return rows;
    } catch (err) {
        console.log("getRowsErr: " + err);
        return "getRowsErr: + " + err;
    }
}

async function insertRow(queryString, vals) {
    try {
        let [rows, fields] = await pool.execute(queryString, vals);
        return rows;
    } catch (err) {
        console.log("insertRowErr: " + err);
        return "insertRowErr: " + err;
    }
}

async function authenticateUser(credentials) {
    try {
        let queryString = `SELECT uName, uSalt, uPassword FROM users WHERE uName = ?`;
        let [rows, fields] = await pool.execute(queryString, [credentials.username]);
        console.log("verifyUser: " + rows);
        return false;
    } catch (err) {
        console.log("getRowsErr: " + err);
        return false;
    }
}


function generateToken(username) {
    const token = jwt.sign({user: username}, API_KEY);
    console.log(token);
    return token;
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log("authHeader: " + authHeader);
    console.log("token: " + token);

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, API_KEY, (err, user) => {
        if (err) {
            console.log("authenticateUserError: " + err);
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

function hashStrings(str1, str2) {
    return crypto.createHash('sha256').update(str1 + str2).digest('base64');
}

function genBytes() {
    return crypto.randomBytes(24).toString('base64');
}

exports.authenticateToken = authenticateToken;
exports.generateToken = generateToken;
exports.closeDatabase = closeDatabase;
exports.getRows = getRows;
exports.insertRow = insertRow;
exports.authenticateUser = authenticateUser;
exports.hashStrings = hashStrings;
exports.genBytes = genBytes;
