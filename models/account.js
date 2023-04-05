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
        default: function() {
            const date = new Date();
            date.setUTCHours(date.getUTCHours() + 2); // Ajouter le décalage horaire pour l'Europe de l'Ouest
            return date;
        }
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
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('account', accountSchema)
