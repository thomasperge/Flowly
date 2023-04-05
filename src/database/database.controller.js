const dbService = require('./database.service');

exports.addUserController = async (req, res) => {
  try {
    return await dbService.addUserInDB(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addUserStatsController = async (req, res) => {
  try {
    return await dbService.addUserInDB(req);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUserController = async (req, _res) => {
  try {
    const result = await dbService.loginUser(req);
    return result;
  } catch (error) {
    return error
  }
};

exports.returnUserStatsController = async (_req, _res) => {
  try {
    const result = await dbService.returnUserStats();
    return result;
  } catch (error) {
    return error
  }
};

exports.returnUserDataFromEmailController = async (req, _res) => {
  try {
    const result = await dbService.returnUserDataFromEmail(req);
    return result;
  } catch (error) {
    return error
  }
};

exports.returnUserDataFromIdController = async (_req, _res) => {
  try {
    const result = await dbService.returnUserDataFromId();
    return result;
  } catch (error) {
    return error
  }
};

exports.addCarRecordController = async (req, _res) => {
  try {
    let result = await dbService.addCarRecord(req);
    return result;
  } catch (error) {
    return error
  }
};

exports.addEnergyRecordController = async (req, _res) => {
  try {
    let result = await dbService.addEnergyRecord(req);
    return result;
  } catch (error) {
    return error
  }
};

exports.getAllRecordFromUserController = async (_req, _res) => {
  try {
    let result = await dbService.getAllRecordFromUser();
    return result;
  } catch (error) {
    return error
  }
};

exports.getMostCarUsedController = async (_req, _res) => {
  try {
    let result = await dbService.getMostCarUsed();
    return result;
  } catch (error) {
    return error
  }
};

exports.getLast10DaysConsumptionController = async (req, _res) => {
  try {
    let result = await dbService.getLast10DaysConsumption(req);
    return result;
  } catch (error) {
    return error
  }
};

exports.addContactRequestController = async (req, _res) => {
  try {
    let result = await dbService.addContactRequest(req);
    return result;
  } catch (error) {
    return error
  }
};