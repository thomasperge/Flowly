const mongoose = require('mongoose')
const { typeUsers } = require('./enum.js');
const { v4: uuidv4 } = require('uuid');

const accountSchema = mongoose.Schema({
    _id: {
        type: String,
        default: uuidv4,
        primary: true,
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    type: {
        type: String,
        default: typeUsers[1],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('account', accountSchema)
