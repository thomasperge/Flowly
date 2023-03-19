const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');
const bcrypt = require('bcryptjs');

/**
 * Add User in Database
 * @param {*} data (Object : email, password, typeOfUser)
 */
exports.addUserInDB = async (data) => {
	try {
		const User = mongoose.model('account', accountSchema);

		const salt = await bcrypt.genSalt(10);
  		const passwordHash = await bcrypt.hash(data.password, salt);

		const newUser = new User({
			type: data.typeUsers,
			email: data.email,
			username: "thomas",
			password: passwordHash,
		});

		newUser.save()
	} catch (error) {
		console.error(error);
	}
};

/**
 * Check password and hashed password
 * @param {*} password 
 * @param {*} hashedPassword 
 * @returns 
 */
async function checkPassword(password, hashedPassword) {
	return await bcrypt.compare(password, hashedPassword);
}

/**
 * Login User with email and Password
 * @param {*} data (Object : email, password, typeOfUser)
 * @returns ``true`` if user found, else return ``false``
 */
exports.loginUser = async (data) => {
	const User = mongoose.model('account', accountSchema);

	let userFound = await User.findOne({ email: data.email })

	if (!userFound) return false
	else {
		if (await checkPassword(data.password, userFound.password)) {
			return true
		}
		
		return false
	}
};
