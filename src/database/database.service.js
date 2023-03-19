const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');

/**
 * Add User In DataBase
 * @param {*} data TypeOfUser, Email, Password
 */
exports.addUserInDB = async (data) => {
  try {
    const User = mongoose.model('account', accountSchema);

    const newUser = new User({
        type: data.typeUsers,
        email: data.email,
        username: "thomas",
        password: data.password,
    });

    newUser.save()
  } catch (error) {
    console.error(error);
  }
};

/**
 * Login User
 * @param {*} data Email, Password
 */
exports.addUserInDB = async (data) => {
  try {
    const User = mongoose.model('account', accountSchema);

    const newUser = new User({
        type: data.typeUsers,
        email: data.email,
        username: "thomas",
        password: data.password,
    });

    newUser.save()
  } catch (error) {
    console.error(error);
  }
};
