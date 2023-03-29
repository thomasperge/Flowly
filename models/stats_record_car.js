const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const totalRecordCarSchema = mongoose.Schema({
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
    fourgonette: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    mini_fourgonette: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    pick_up: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    coupes: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    suv: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    crossover: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    break: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    berline: {
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
})

module.exports = mongoose.model('total_record_car', totalRecordCarSchema)
