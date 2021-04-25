const drivelist = require('drivelist');
const child_process = require("child_process")
const fs = require("fs");
const crypto = requre("crypto");

function hashStrings(str1, str2) {
    return crypto.createHash('sha256').update(str1 + str2).digest('base64');
}


exports.hashStrings = hashStrings;
