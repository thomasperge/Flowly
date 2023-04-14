const axios = require('axios');
require('dotenv').config();
const envJson = require('../../env.json')

const API_BASE_URL = 'https://www.carboninterface.com/api/v1';
const API_KEY = envJson.API_KEY;

/**
 * Get Estimations : Test function
 * @param {*} data 
 * @returns 
 */
const getEstimate = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/estimates`, data, {
            headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

/**
 * Get Estimate Carbon Vehicle
 * @param {*} data 
 * @returns 
 */
const getEstimateVehicleCarbon = async (data) => {
    const endpoint = 'https://www.carboninterface.com/api/v1/estimates';

    const config = {
        headers: {
            Authorization: 'Bearer ' + API_KEY,
        },
    };

    let vehicleId = ""

    if (data.carType == "Fourgonette") {
        // Mercedes Metris (Cargo Van) (2018)
        vehicleId = "0c427c89-4204-4bb0-94b3-d3cf44b31a49"
    } else if (data.carType == "Mini-Fourgonette") {
        // Ford Transit Connect Van FFV (2020)
        vehicleId = "5871324a-9a32-4dfc-ac1c-377ab902c1f6"
    } else if (data.carType == "Pick-up") {
        // Toyota Tundra 4WD (2019)
        vehicleId = "47759e03-f3c5-49ce-9906-b5782a335aeb"
    } else if (data.carType == "Coupés") {
        // Mercedes S560 4matic Coupe (2020)
        vehicleId = "0352e48f-0be7-4147-9344-d11e24f3c357"
    } else if (data.carType == "SUV") {
        // Audi Q3 (2018)
        vehicleId = "ec650044-c2c9-4f5a-8c5b-2a973683b8d3"
    } else if (data.carType == "Crossover") {
        // Mercedes GLA250 (2019)
        vehicleId = "53a469a0-c556-49b5-9416-d0def3b986db"
    } else if (data.carType == "Break") {
        // Volvo V90 AWD (2020)
        vehicleId = "658f9f15-b1c7-4774-bca9-012b87d0abf8"
    } else if (data.carType == "Berline") {
        // BMW M3 (2018)
        vehicleId = "bb01ee35-1c2b-482b-b978-033814f4a8d6"
    }

    const requestData = {
        "type": "vehicle",
        "distance_unit": "km",
        "distance_value": data.km,
        "vehicle_model_id": vehicleId
    }

    return axios.post(endpoint, requestData, config)
    .then((response) => {
        return response.data.data
    })
    .catch((error) => {
        console.error(error);
    });
};

/**
 * Get Estimate Carbon Vehicle
 * @param {*} data 
 * @returns 
 */
const getEstimateEnergyCarbon = async (data) => {
    const endpoint = 'https://www.carboninterface.com/api/v1/estimates';

    const config = {
        headers: {
            Authorization: 'Bearer ' + API_KEY,
        },
    };

    const requestData = {
        "type": "electricity",
        "electricity_unit": data.unit,
        "electricity_value": data.value,
        "country": data.country,
        "state": ""
    }

    return axios.post(endpoint, requestData, config)
    .then((response) => {
        return response.data.data
    })
    .catch((error) => {
        console.error(error);
    });
};

module.exports = { getEstimate, getEstimateVehicleCarbon, getEstimateEnergyCarbon };