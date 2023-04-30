const axios = require('axios');
const catchAsync = require('../utilities/catchAsync');

module.exports.getCurrency = async (currency) => {
    try {
        const { from, to } = { from: 'USD', to: currency }; // USD will be constant and EGP will be variable as per the country
        const url = `https://api.exchangerate.host/convert?from=${from}&to=${to}`;
        const response = await axios.get(url);
        const rate = response.data.info.rate;
        if (!rate) {
            return -1;
        } else {
            return rate;
        }    
    } catch (error) {
        console.log(error);
        return -1;
    }
    
};