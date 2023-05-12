const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const accountStatSchema = mongoose.Schema({
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
    planEstimationThisMonth: {
        type: Number,
        default: 0,
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
    total_carbon_vehicle: {
        type: Number,
        default: 0,
    },
    total_km_flight: {
        type: Number,
        default: 0,
    },
    total_carbon_flight: {
        type: Number,
        default: 0,
    },
    total_km_shipping: {
        type: Number,
        default: 0,
    },
    total_carbon_shipping: {
        type: Number,
        default: 0,
    },
    total_electricity_mwh: {
        type: Number,
        default: 0,
    },
    total_carbon_electricity: {
        type: Number,
        default: 0,
    },
    total_fuel_btu: {
        type: Number,
        default: 0,
    },
    total_carbon_fuel: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('account_stats', accountStatSchema)
