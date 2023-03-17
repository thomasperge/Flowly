const apiService = require('./api.service');

exports.calculateCarbonElectricity = async (req, res) => {
  try {
    const carbonFootprintData = req.body;

    const result = await apiService.getEstimate(carbonFootprintData);

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};