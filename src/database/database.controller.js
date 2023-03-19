const dbService = require('./database.service');

/**
 * Add user in Database
 * @param {*} req Data
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
 * Login user
 * @param {*} req Data : Email, Password
 * @param {*} res 
 * @returns Boolean
 */
exports.loginUserController = async (req, res) => {
  try {
    const result = await dbService.loginUser(req);

    return result;
  } catch (error) {
    return error
  }
};

exports.returnUserDataFromEmailController = async (req, res) => {
  try {
    const result = await dbService.returnUserDataFromEmail(req);

    return result;
  } catch (error) {
    return error
  }
};