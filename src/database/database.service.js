const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');
const { recordCarSchema } = require('../../models/record_car');
const { statsSchema } = require('../../models/stats');
const { allRecordSchema } = require('../../models/all_record');
const idUserDataJson = require('../../data.json');
const bcrypt = require('bcryptjs');

/**
 * Add User in Database
 * @param {*} data (Object : email, password, typeOfUser)
 */
exports.addUserInDB = async (data) => {
	try {
		// Create User account
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

		// Create Stats Account
		const Stats = mongoose.model('users_stats', statsSchema);

		const userStats = new Stats({
			idAccount: newUser._id,
			total_km: 0,
			total_carbon_kg: 0,
			total_km_vehicle: 0,
			total_carbon_vehicle: 0,
			total_km_flight: 0,
			total_carbon_flight: 0,
			total_km_shipping: 0,
			total_carbon_shipping: 0,
			total_electricity_mwh: 0,
			total_carbon_electricity: 0,
			total_fuel_btu: 0,
			total_carbon_fuel: 0,
		});

		userStats.save()
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
		// Add Car Record
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

		// Add user Stats
		const UsersStats = mongoose.model('users_stats', statsSchema);
		const stats = await UsersStats.findOne({ idAccount: idUserDataJson.id })

		if(stats) {
			stats.total_carbon_kg += data.response.attributes.carbon_kg;
			stats.total_km_vehicle += data.response.attributes.distance_value;
			stats.total_carbon_vehicle += data.response.attributes.carbon_kg
			await stats.save()
		} else {
			console.log("Erreur : Utilisateur non trouvé");
		}

		// Add all record
		const allRecord = mongoose.model('all_record', allRecordSchema);

		const newAllRecord = new allRecord({
			idAccount: idUserDataJson.id,
			record_type: "Car",
			dateInput: data.input.date,
			description_record: data.input.carType,
			int_value: data.response.attributes.distance_value,
			string_value: `${data.response.attributes.distance_value} km`,
			carbon_g: data.response.attributes.carbon_g,
			carbon_lb: data.response.attributes.carbon_lb,
			carbon_kg: data.response.attributes.carbon_kg,
			carbon_mt: data.response.attributes.carbon_mt,
		});

		newAllRecord.save()

		return true
	} catch (error) {
		return false
	}
};

exports.returnUserStats = async (data) => {
	const UsersStats = mongoose.model('users_stats', statsSchema);
	const stats = await UsersStats.findOne({ idAccount: idUserDataJson.id })

	if(stats) {
		return stats
	} else {
		return null
	}
};

exports.getAllRecordFromUser = async (data) => {
	const UsersStats = mongoose.model('all_record', allRecordSchema);
	const stats = await UsersStats.find({ idAccount: idUserDataJson.id })

	if(stats) {
		return stats
	} else {
		return null
	}
};