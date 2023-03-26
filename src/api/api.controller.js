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

exports.getVehicleBrandIdController = async (req, _res) => {
  try {
    const result = await apiService.getVehicleBrandId(req.brands);
    console.log("==========>", result);
    return result
  } catch (error) {
    console.log(error);
    return error
  }
};