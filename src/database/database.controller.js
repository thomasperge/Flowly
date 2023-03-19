const dbService = require('./database.service');

/**
 * Add User in Database
 * @param {*} req TypeOfUser, Email, Password 
 * @param {*} res 
 * @returns 
 */
exports.addUserController = async (req, res) => {
  try {
    return await dbService.addUserInDB(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 
 * @param {*} req Email, Password
 * @param {*} res 
 * @returns 
 */
exports.loginUser = async (req, res) => {
  try {
    return await dbService.addUserInDB(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};