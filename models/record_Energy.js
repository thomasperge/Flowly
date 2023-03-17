const mongoose = require('mongoose')
const { energy_type } = require('./enum.js');
const { v4: uuidv4 } = require('uuid');

const recordEnergySchema = mongoose.Schema({
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
        default: energy_type[0],
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

module.exports = mongoose.model('record_energy', recordEnergySchema)
