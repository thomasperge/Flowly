const mongoose = require('mongoose')
const { transport_type } = require('./enum.js');
const { v4: uuidv4 } = require('uuid');

const recordTransportSchema = mongoose.Schema({
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
    method_type : {
        type : String,
        default: transport_type[0],
        required: true,
    },
    distance: { 
        type: String, 
        required: true,
    },
    carbon_g: { 
        type: Number, 
        required: true,
    },
    carbon_lb: { 
        type: Number, 
        required: true,
    },
    carbon_lb: { 
        type: Number, 
        required: true,
    },
    carbon_mt: { 
        type: Number, 
        required: true,
    },
})

module.exports = mongoose.model('record_transport', recordTransportSchema)
