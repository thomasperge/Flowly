const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const recordCarSchema = mongoose.Schema({
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
    distanceDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    car_type : {
        type : String,
        required: true,
    },
    distance: { 
        type: Number, 
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
    carbon_kg: { 
        type: Number,
        required: true,
    },
    carbon_mt: { 
        type: Number, 
        required: true,
    },
})

module.exports = mongoose.model('record_car', recordCarSchema)
