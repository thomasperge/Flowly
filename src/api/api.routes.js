const express = require('express');
const router = express.Router();
const apiController = require('./api.controller');

router.post('/carbon-electricity', apiController.calculateCarbonElectricity);

module.exports = router;