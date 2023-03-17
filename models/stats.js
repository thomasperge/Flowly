const mongoose = require('mongoose')
const { typeUsers } = require('./enum.js');
const { v4: uuidv4 } = require('uuid');

const statsSchema = mongoose.Schema({
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
    total_km: {
        type: Number,
        default: 0,
    },
    total_carbon_kg: {
        type: Number,
        default: 0,
    },
    total_km_vehicle: {
        type: Number,
        default: 0,
    },
    total_km_flight: {
        type: Number,
        default: 0,
    },
    total_km_shipping: {
        type: Number,
        default: 0,
    },
    total_electricity_mwh: {
        type: Number,
        default: 0,
    },
    total_fuel_btu: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('stats', statsSchema)
