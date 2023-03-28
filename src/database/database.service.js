const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');
const { recordCarSchema } = require('../../models/record_car')
const idUserDataJson = require('../../data.json')
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
 * @returns Boolean
 */
exports.loginUser = async (data) => {
	const User = mongoose.model('account', accountSchema);

	let userFound = await User.findOne({ email: data.email })

	if (!userFound) return false
	else {
		if (await checkPassword(data.password, userFound.password)) {
			idUserDataJson.id = userFound._id
			return true
		}
		
		return false
	}
};


/**
 * Function who return all information about users
 * @param {*} data 
 * @returns account schema
 */
exports.returnUserDataFromEmail = async (data) => {
	const User = mongoose.model('account', accountSchema);

	let userFound = await User.findOne({ email: data.email })

	if (!userFound) return undefined
	else {
		if (await checkPassword(data.password, userFound.password)) {
			return userFound
		}
		
		return undefined
	}
};


/**
 * Add car record => return true id add in Db
 * @param {*} data 
 */
exports.addCarRecord = async (data) => {
	try {
		const CarRecord = mongoose.model('record_car', recordCarSchema);

		const newCarRecord = new CarRecord({
			idAccount: idUserDataJson.id,
			distanceDate: data.input.date,
			car_type: data.input.carType,
			distance: data.response.attributes.distance_value,
			carbon_g: data.response.attributes.carbon_g,
			carbon_lb: data.response.attributes.carbon_lb,
			carbon_kg: data.response.attributes.carbon_kg,
			carbon_mt: data.response.attributes.carbon_mt,
		});

		newCarRecord.save()
		return true
	} catch (error) {
		return false
	}
};