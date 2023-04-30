const CatchAsync = require('../utilities/catchAsync');
const axios = require('axios');
module.exports.getWeather = async (latitude, longitude, startDate = new Date(), endDate = new Date()) => {
    try {
        endDate.setDate(endDate.getDate() + 7);
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
        const times = response.data.daily.time;
        const temps_max = response.data.daily.temperature_2m_max;
        const temps_min = response.data.daily.temperature_2m_min;
        const data = times.map((time, index) => {
            return { time, temp_max: temps_max[index], temp_min: temps_min[index] };
        }).filter((obj) => {
            return obj.time >= startDate.toISOString() && obj.time <= endDate.toISOString();
        });
        return data;
    } catch (error) {
        console.log(error);
        return -1;
    }
 };