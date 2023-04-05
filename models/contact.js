const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const contactSchema = mongoose.Schema({
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
        default: function() {
            const date = new Date();
            date.setUTCHours(date.getUTCHours() + 2); // Ajouter le décalage horaire pour l'Europe de l'Ouest
            return date;
        }
    },
    nameAccount: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    request: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('request', contactSchema)
