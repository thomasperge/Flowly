const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const employeeAccountSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    createdAt: { 
        type: Date, 
        default: function() {
            const date = new Date();
            date.setUTCHours(date.getUTCHours() + 2);
            return date;
        }
    },
    accountId: {
        type: String,
        required: true,
    },
    firstName: {
        type: Number,
        default: 0,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('account', employeeAccountSchema)
