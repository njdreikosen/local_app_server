const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RFS = new Schema({
    rfsName: {
        type: String
    },
    rfsType: {
        type: String
    },
    rfsDate: {
        type: String
    },
    rfsSize: {
        type: Number
    },
    rfsChildren: {
        type: [this]
    }
});

module.exports = mongoose.model('RFS', RFS);