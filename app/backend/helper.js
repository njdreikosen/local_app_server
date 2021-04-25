const crypto = require("crypto");

function hashStrings(str1, str2) {
    return crypto.createHash('sha256').update(str1 + str2).digest('base64');
}


exports.hashStrings = hashStrings;
