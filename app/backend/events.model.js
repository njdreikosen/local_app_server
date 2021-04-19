const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let event = new Schema(
    {
        eID: {
            type: Number
        },
        eName: {
            type: String,
            required: [true, "Your event needs a name!"]
        },
        eDate: {
            type: String,
            required: [true, "Your event needs a date!"]
        }
    },
    { collation: "Events" }
);

module.exports = mongoose.model('Events', eventsSchema);