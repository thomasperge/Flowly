const mongoose = require('mongoose')
const { typeUsers } = require('./enum.js');
const { v4: uuidv4 } = require('uuid');

const contactSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    idAccount: {
        type: String, 
        ref: 'Account',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    nameAccount: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('request', contactSchema)
