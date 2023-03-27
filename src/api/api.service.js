const axios = require('axios');
require('dotenv').config();

const API_BASE_URL = 'https://www.carboninterface.com/api/v1';
const API_KEY = process.env.API_KEY;

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

const getEstimateVehicleCarbon = async (makeName) => {
    const endpoint = 'https://www.carboninterface.com/api/v1/vehicle_makes';

    const config = {
        headers: {
            Authorization: 'Bearer ' + API_KEY,
        },
    };

    if (makeName == "Fourgonette") {
        
    } else if (makeName == "Mini-Fourgonette") {
        
    } else if (makeName == "Pick-up") {
        
    } else if (makeName == "Coupés") {
        
    } else if (makeName == "SUV") {
        
    } else if (makeName == "Crossover") {
        
    } else if (makeName == "Hayons") {
        
    } else if (makeName == "Break") {
        
    } else if (makeName == "Berline") {
        
    } else if (makeName == "Minibus") {
        
    }

    return axios.get(endpoint, config)
    .then((response) => {
        const vehicleMakes = response.data;

        if (!vehicleMakes) {
            throw new Error('Failed to get vehicle makes from API.');
        }

        let makeId = null;

        vehicleMakes.forEach((make) => {
            if (make.data.attributes.name.toLowerCase() == makeName.toLowerCase()) {
                makeId = make.data.id;
            }
        });

        return makeId;
    })
    .catch((error) => {
        console.error(error);
    });
};

module.exports = { getEstimate, getEstimateVehicleCarbon };