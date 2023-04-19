const mongoose = require('mongoose');
const { accountSchema } = require('../../models/account');
const { totalRecordCarSchema } = require('../../models/stats_car_account');
const { accountStatSchema } = require('../../models/account_stats');
const { allRecordSchema } = require('../../models/all_record');
const { contactSchema } = require('../../models/contact')
const { employeeAccountSchema } = require('../../models/employee')
const { employeeStatsSchema } = require('../../models/employee_stats')
const { getCurrentDate } = require('../components/script/date')

const idUserDataJson = require('../../data.json');
const moment = require('moment');
const bcrypt = require('bcryptjs');

/**
 * Add User in Database
 * @param {*} data (Object : email, password, typeOfUser)
 */
exports.addUserInDB = async (data) => {
	try {
		// Create User Schema
		const User = mongoose.model('account', accountSchema);

		const salt = await bcrypt.genSalt(10);
  		const passwordHash = await bcrypt.hash(data.password, salt);

		const newUser = new User({
			type: data.typeUsers,
			plan: 0,
			email: data.email,
			name: data.name,
			password: passwordHash,
		});

		newUser.save()

		// Create Users Stats Schema
		const Stats = mongoose.model('account_stats', accountStatSchema);

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

		// Create Car Record Stats Schema
		const totalRecordStats = mongoose.model('stats_cars_account', totalRecordCarSchema);

		const newCarStatsRecord = new totalRecordStats({
			idAccount: newUser._id,
			fourgonette : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			mini_fourgonette : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			pick_up : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			coupes : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			suv : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			crossover : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			break : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
			berline : {
				total_distance: 0,
				total_carbon_kg: 0,
			},
		});

		newCarStatsRecord.save()

		// Create Employee (employe by default - Owner)
		const Employee = mongoose.model('employees', employeeAccountSchema);

		const newEmployee = new Employee({
			_id: newUser._id,
			accountId: newUser._id,
			firstName: data.name,
			lastname: "Owner"
		})

		newEmployee.save()
		
		// Create Employee Stats
		const EmployeeStats = mongoose.model('employee_stats', employeeStatsSchema)

		const employeeStats = new EmployeeStats({
			idEmployee: newEmployee._id,
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
			total_carbon_fuel: 0
		})

		employeeStats.save()
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
	const Employee = mongoose.model('employees', employeeAccountSchema);

	let userFound = await User.findOne({ email: data.email })

	if (!userFound) return false
	else {
		let employeeFound = await Employee.findOne({ accountId: userFound._id })

		if (await checkPassword(data.password, userFound.password)) {
			idUserDataJson.id = userFound._id
			idUserDataJson.employee = employeeFound._id
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

exports.returnUserDataFromId = async () => {
	const User = mongoose.model('account', accountSchema);

	let userFound = await User.findOne({ _id: idUserDataJson.id })

	return (userFound) ? userFound : undefined
};

/**
 * Add car record => return true id add in Db
 * @param {*} data 
 */
exports.addCarRecord = async (data) => {
	try {
		const CarRecord = mongoose.model('all_record', allRecordSchema);

		const newCarRecord = new CarRecord({
			idAccount: idUserDataJson.id,
			idEmployee: idUserDataJson.employee,
			record_type: 'Car',
			dateInput: data.input.date,
			description_record: data.input.carType,
			int_value: data.input.km,
			string_value: `${data.input.km} km`,
			carbon_g: data.response.attributes.carbon_g,
		});

		newCarRecord.save()

		// Add User Stats && Car Stats
		const UsersStats = mongoose.model('account_stats', accountStatSchema);
		const stats = await UsersStats.findOne({ idAccount: idUserDataJson.id })

		const EmployeeStats = mongoose.model('employee_stats', employeeStatsSchema)
		const employeeStats = await EmployeeStats.findOne({ idEmployee: idUserDataJson.employee })

		const totalRecordStats = mongoose.model('stats_cars_account', totalRecordCarSchema);
		const statsCarRecord = await totalRecordStats.findOne({ idAccount: idUserDataJson.id })

		console.log(stats, employeeStats, statsCarRecord);

		if(stats && statsCarRecord && employeeStats) {
			// SAVE in Db : Users Stats
			stats.total_carbon_kg += data.response.attributes.carbon_kg;
			stats.total_km_vehicle += data.response.attributes.distance_value;
			stats.total_carbon_vehicle += data.response.attributes.carbon_kg
			await stats.save()

			employeeStats.total_km += data.response.attributes.distance_value
			employeeStats.total_carbon_kg += data.response.attributes.carbon_kg
			await employeeStats.save()

			// SAVE in Db : Users Stats All car record
			if(data.input.carType == "Fourgonette") {
				statsCarRecord.fourgonette.total_distance += data.response.attributes.distance_value
				statsCarRecord.fourgonette.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Mini-Fourgonette") {
				statsCarRecord.mini_fourgonette.total_distance += data.response.attributes.distance_value
				statsCarRecord.mini_fourgonette.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Pick-up") {
				statsCarRecord.pick_up.total_distance += data.response.attributes.distance_value
				statsCarRecord.pick_up.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Coupés") {
				statsCarRecord.coupes.total_distance += data.response.attributes.distance_value
				statsCarRecord.coupes.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "SUV") {
				statsCarRecord.suv.total_distance += data.response.attributes.distance_value
				statsCarRecord.suv.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Crossover") {
				statsCarRecord.crossover.total_distance += data.response.attributes.distance_value
				statsCarRecord.crossover.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Break") {
				statsCarRecord.break.total_distance += data.response.attributes.distance_value
				statsCarRecord.break.total_carbon_kg += data.response.attributes.carbon_kg
			} else if(data.input.carType == "Berline") {
				statsCarRecord.berline.total_distance += data.response.attributes.distance_value
				statsCarRecord.berline.total_carbon_kg += data.response.attributes.carbon_kg
			}

			await statsCarRecord.save()
		} else {
			console.log("Erreur : Utilisateur non trouvé");
		}

		return true
	} catch (error) {
		console.log('===> Erreur ici', error.message);
	}
};

exports.addEnergyRecord = async (data) => {
	try {
		const EnergyRecord = mongoose.model('all_record', allRecordSchema);

		const newEnergyRecord = new EnergyRecord({
			idAccount: idUserDataJson.id,
			record_type: 'Energy',
			dateInput: data.input.date,
			description_record: `Country ${data.input.country}`,
			int_value: data.input.value,
			string_value: `${data.input.value} ${(data.response.attributes.electricity_unit == "kwh") ? "kwh" : "mwh"}`,
			carbon_g: data.response.attributes.carbon_g,
			carbon_lb: data.response.attributes.carbon_lb,
			carbon_kg: data.response.attributes.carbon_kg,
			carbon_mt: data.response.attributes.carbon_mt,
		});

		newEnergyRecord.save()

		// Add User Stats && Car Stats
		const UsersStats = mongoose.model('account_stats', accountStatSchema);
		const stats = await UsersStats.findOne({ idAccount: idUserDataJson.id })


		if(stats) {
			// SAVE in Db : Users Stats
			stats.total_carbon_kg += data.response.attributes.carbon_kg;
			stats.total_electricity_mwh += (data.response.attributes.electricity_unit == "kwh") ? (data.response.attributes.electricity_value/1000) : data.response.attributes.electricity_value;
			stats.total_carbon_electricity += data.response.attributes.carbon_kg
			await stats.save()
		} else {
			console.log("Erreur : Utilisateur non trouvé");
		}

		return true
	} catch (error) {
		console.log('===> Erreur ici', error.message);
	}
};
/**
 * Return all stats of Users
 * @param {*} data 
 * @returns 
 */
exports.returnUserStats = async (data) => {
	const UserStats = mongoose.model('account_stats', accountStatSchema);
	const stats = await UserStats.findOne({ idAccount: idUserDataJson.id })

	if(stats) {
		return stats
	} else {
		return null
	}
};

/**
 * Get all record from user
 * @returns 
 */
exports.getAllRecordFromUser = async () => {
	const UsersStats = mongoose.model('all_record', allRecordSchema);
	const stats = await UsersStats.find({ idAccount: idUserDataJson.id })

	if(stats) {
		return stats
	} else {
		return null
	}
};

/**
 * Get 2 most car used per user
 * @returns null or 2 most car used
 */
exports.getMostCarUsed = async () => {
	const UsersAllCarStats = mongoose.model('stats_cars_account', totalRecordCarSchema);
	const allCarStats = await UsersAllCarStats.find({ idAccount: idUserDataJson.id })

	if (allCarStats.length >= 1) {
		let results = {};
	
		for (const doc of allCarStats) {
			for (const path in doc._doc) {
				if (
					path !== '_id' &&
					path !== 'idAccount' &&
					doc._doc[path] &&
					doc._doc[path].total_distance &&
					doc._doc[path].total_carbon_kg
				) {
					if (!results[path]) {
						results[path] = {
							total_distance: 0,
							total_carbon_kg: 0,
							string_name: ""
						};
					}
					results[path].total_distance += doc._doc[path].total_distance;
					results[path].total_carbon_kg += doc._doc[path].total_carbon_kg;
					results[path].string_name += doc._doc[path].string_name;
				}
			}
		}

		// Trier le tableau des résultats par ordre décroissant de la somme total_distance + total_carbon_kg
		const sortedObj = Object.entries(results).sort(
			(a, b) => (b[1].total_distance + b[1].total_carbon_kg) - (a[1].total_distance + a[1].total_carbon_kg)
		);

		if (sortedObj.length >= 2) {
			return [sortedObj[0], sortedObj[1]];
		} else {
			return null
		}
	} else {
		return null
	}
}

exports.getLast10DaysConsumption = async (type) => {
	const UsersStats = mongoose.model('all_record', allRecordSchema);
	const start = moment().subtract(10, 'days').startOf('day').toDate();

	let i = await UsersStats.aggregate([
		{
			$match: {
				idAccount: idUserDataJson.id,
				dateInput: { $gte: start },
				record_type: type
			}
		},
		{
			$group: {
				_id: {
					$dateToString: {
						format: '%Y-%m-%d',
						date: '$dateInput'
					}
				},
				carbon: { $sum: '$carbon_kg' }
			}
		},
		{
			$project: {
				_id: 1,
				carbon: { $ifNull: [ "$carbon", 0 ] }
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	]);

	// Compléter les jours sans données avec 0
	const dayStats = {};
	let today = moment().startOf('day');
	for (let j = 0; j < 10; j++) {
		let day = today.format('Y-MM-DD');
		dayStats[day] = 0;
		today.subtract(1, 'day');
	}

	for (let j = 0; j < i.length; j++) {
		let day = i[j]._id;
		dayStats[day] = i[j].carbon;
	}

	const stats = Object.entries(dayStats).map(([day, carbon]) => {
		return {
			day,
			carbon
		}
	});

	return stats
};

exports.addContactRequest = async (data) => {
	try {
		// Get User data
		var userData = await this.returnUserDataFromId()

		// Create Contact Schema
		const Request = mongoose.model('request', contactSchema);

		const newRequest = new Request({
			idAccount: idUserDataJson.id,
			nameAccount : userData.name,
			email : userData.email,
			request : data.text,
		});

		newRequest.save()

		if (newRequest) {
			return true
		}

		return false
	} catch (error) {
		console.error(error);
	}
};
