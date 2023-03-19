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
 * Login User with email and Password
 * @param {*} data Email, Password
 * @returns ``true`` if user found, else return ``false``
 */
exports.loginUser = async (data) => {
	const User = mongoose.model('account', accountSchema);

	let userFound = await User.findOne({ email: data.email, password: data.password })
	
	if (!userFound) return false
	else {
		return true
	}
};
