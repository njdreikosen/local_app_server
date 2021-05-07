/* External Imports */
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

/*===========================================================================*/
/*                      Database Setup and Functions                         */
/*===========================================================================*/
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

// Get API Key
API_KEY = process.env.LAS_API_KEY;

// End the database connection pool
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

// Initialize the database
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

// Get rows from the database
async function getRows(queryString, vals) {
    try {
        let [rows, fields] = await pool.execute(queryString, vals);
        return rows;
    } catch (err) {
        console.log("getRowsErr: " + err);
        return "getRowsErr: + " + err;
    }
}

// Insert a row into the database
async function insertRow(queryString, vals) {
    try {
        let [rows, fields] = await pool.execute(queryString, vals);
        return rows;
    } catch (err) {
        console.log("insertRowErr: " + err);
        return "insertRowErr: " + err;
    }
}


/*===========================================================================*/
/*                   Authentication and Token Functions                      */
/*===========================================================================*/
// Authenticate a user's JWT
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

// Authenticate a user's username and password
async function authenticateUser(credentials) {
    try {
        let queryString = `SELECT uName, uSalt, uPassword FROM users WHERE uName = ?`;
        let [rows, fields] = await pool.execute(queryString, [credentials.username]);
        console.log("verifyUser: " + rows);
        if (rows.length !== 1) {
            console.log("Found " + rows.length + " users when trying to login.");
            return false;
        } else {
            let user = rows[0];
            return (user.uPassword === hashStrings(user.uSalt, hashStrings(user.uSalt, credentials.password)));
        }
    } catch (err) {
        console.log("getRowsErr: " + err);
        return false;
    }
}

// Check whether the user should have access to the File Server
function checkUserAccess(req, res, next) {
    // TO GIVE A USER ACCESS, HASH THEIR USERNAME USING THE hashStrings FUNCTION (hashStrings('', username)),
    // AND ADD IT TO THE ARRAY BELOW
    const validUsers = ['G7vFr1CiCjkPpdttU8nArN6PwcPPbGcXm5JUi9aqvLE='];
    const user = JSON.parse(decodeBase64(req.headers.authorization.split(' ')[1].split('.')[1])).user;
    if (!validUsers.includes(hashStrings('', user))) {
        return res.sendStatus(418);
    }
    next();
}

// Generate a JWT from the user's username
function generateToken(username) {
    const token = jwt.sign({user: username}, API_KEY);
    console.log(token);
    return token;
}


/*===========================================================================*/
/*                             Helper Functions                              */
/*===========================================================================*/
// Decode a Base65 string back to UTF-8
function decodeBase64(str) {
    return Buffer.from(str, 'base64').toString('utf8');
}

// Generate a random Base64 string that is 24 bytes (32 Base64 characters) long
function genBytes() {
    return crypto.randomBytes(24).toString('base64');
}

// Hash two strings using SHA256 to a Base64 string
function hashStrings(str1, str2) {
    return crypto.createHash('sha256').update(str1 + str2).digest('base64');
}


exports.authenticateToken = authenticateToken;
exports.authenticateUser = authenticateUser;
exports.checkUserAccess = checkUserAccess;
exports.closeDatabase = closeDatabase;
exports.decodeBase64 = decodeBase64;
exports.genBytes = genBytes;
exports.generateToken = generateToken;
exports.getRows = getRows;
exports.hashStrings = hashStrings;
exports.insertRow = insertRow;
