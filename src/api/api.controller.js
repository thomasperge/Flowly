const apiService = require('./api.service');

exports.calculateCarbonElectricityController = async (req, res) => {
    try {
        const carbonFootprintData = req.body;
        const result = await apiService.getEstimate(carbonFootprintData);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEstimateVehicleCarbonController = async (req, _res) => {
    try {
        const result = await apiService.getEstimateVehicleCarbon(req);
        return result
    } catch (error) {
        return error
    }
};