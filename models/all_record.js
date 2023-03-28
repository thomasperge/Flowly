const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const allRecordSchema = mongoose.Schema({
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
    record_type : {
        type : String,
        required: true,
    },
    dateInput : {
        type : Date,
        required: true,
    },
    description_record : {
        type : String,
        required: true,
    },
    int_value: {
        type: String,
        required: true
    },
    string_value: {
        type: String,
        required: true
    },
    carbon_g: {
        type: Number, 
        required: true,
    },
    carbon_lb: {
        type: Number, 
        required: true,
    },
    carbon_kg: { 
        type: Number,
        required: true,
    },
    carbon_mt: { 
        type: Number, 
        required: true,
    },
})

module.exports = mongoose.model('all_record', allRecordSchema)
