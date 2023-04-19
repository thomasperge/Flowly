const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

// Stats of all car - not use for the moment
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
        string_name: { type: String, default: "Fourgonette", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    mini_fourgonette: {
        string_name: { type: String, default: "Mini Fourgonette", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    pick_up: {
        string_name: { type: String, default: "Pick Up", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    coupes: {
        string_name: { type: String, default: "Coupes", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    suv: {
        string_name: { type: String, default: "SUV", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    crossover: {
        string_name: { type: String, default: "Crossover", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    break: {
        string_name: { type: String, default: "Break", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
    berline: {
        string_name: { type: String, default: "Berline", required: false },
        total_distance: { type: Number, required: true },
        total_carbon_kg: { type: Number, required: true },
    },
})

module.exports = mongoose.model('stats_cars_account', totalRecordCarSchema)
