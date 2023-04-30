//send request to weather api

// Path: weather.js
const axios = require('axios');

const getWeather = async (latitude,longitude,startDate,endDate) => {
    try {
        const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=16&timezone=auto`);
        const times = response.data.hourly.time;
        const temps = response.data.hourly.temperature_2m;
        // map times and temps to an array of objects and filter by start and end date
        const data = times.map((time, index) => {
            return { time, temp: temps[index] };
        }).filter((obj) => {
            return obj.time >= startDate && obj.time <= endDate;
        });
        // average each day into two data points
        const dailyData = [];
        for (let i = 0; i < data.length; i += 8) {
            const day = data.slice(i, i + 8);
            const averageTemp = day.reduce((acc, curr) => {
                return acc + curr.temp;
            }, 0) / day.length;
            dailyData.push({ time: day[0].time, temp: averageTemp });
        }
        return dailyData;
    }
    catch (err) {
        console.log(err);
        return err.message;
    }
}

module.exports = { getWeather };