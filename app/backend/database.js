const crypto = require("crypto");
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


function initDB() {
    // Create the database if it isn't already created
    try {
        await pool.query("CREATE DATABASE remote_server");
    } catch (err) {
        console.log("Database already created: " + err);
    }
    // Create the events table if it isn't already created. If it isn't also add common events
    try {
        await pool.query("CREATE TABLE events (eID char(44) NOT NULL, eName varchar(25) NOT NULL, eDate char(8) NOT NULL, PRIMARY KEY (eID))");
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
            eventHash = helper.hashStrings(eventName, eventDate);
            eventInsert = `INSERT INTO events (eID, eName, eDate) VALUES ('${eventHash}', '${eventName}', '${eventDate}')`;
            console.log("Name: " + eventName + ", Date: " + eventDate + ", ID: " + eventHash);
            console.log(eventInsert);
            try {
                connection.query(eventInsert);
            } catch (insertErr) {
                console.log("InsertErr: " + insertErr);
            }
        }
    } catch (err) {
        console.log("Event Table already created: " + err);
    }
    return;
}

function getRows(queryString) {
    try {
        let [rows, fields] = pool.execute(queryString);
        console.log("rows: " + rows);
        console.log("fields: " + fields);
        return rows;
    } catch (err) {
        console.log("getEventsErr: " + err);
        return "getEventsErr: + " + err;
    }
}

function hashStrings(str1, str2) {
    return crypto.createHash('sha256').update(str1 + str2).digest('base64');
}

exports.getRows = getRows;
exports.hashStrings = hashStrings;
