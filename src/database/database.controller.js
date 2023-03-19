const dbService = require('./database.service');

exports.addUser = async (req, res) => {
  try {
    const data = req;

    const result = await dbService.addUser(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};