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

// const apiKey = process.env.TOKEN_CARBON_INTERFACE;

// axios.post('https://www.carboninterface.com/api/v1/estimates', {
//     "type": "electricity",
//     "electricity_unit": "mwh",
//     "electricity_value": 42,
//     "country": "us",
//     "state": "fl"
// }, {
//     headers: {
//         Authorization: `Bearer ${apiKey}`,
//         'Content-Type': 'application/json',
//     }
// })
// .then(response => {
//     const responseData = response.data;
//     console.log(responseData.data);
// })
// .catch(error => {
//     console.error(error);
// });

module.exports = { getEstimate };