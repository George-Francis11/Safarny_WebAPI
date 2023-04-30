// This is the section that converts the coordinates to cities
// // get the cities from coords.geojson
// const fs = require('fs');
// const cities = JSON.parse(fs.readFileSync('./coords.geojson', 'utf8'));

// // select only the city name and coords
// const cityData = cities.features.map((city) => {
//     return { name: city.properties.name, country: city.properties.sov0name, coords: city.geometry };
// });

// console.log(cityData);
// // write the data to a new file in the same format as coords.geojson
// fs.writeFileSync('./cities.geojson', JSON.stringify(cityData), 'utf8');

//---------------------------------------------------------------------------------------------

const fs = require('fs');
const cities = JSON.parse(fs.readFileSync('./cities.geojson', 'utf8'));

// get a specific city by name
const getCity = (name) => {
    const city = cities.find((city) => {
        return city.name.toLowerCase() === name.toLowerCase();
    });
    return city || {
        name: 'Cairo', country: 'Egypt',coords: {type: 'Point',coordinates: [31.2357, 30.0444]}
    };
}
module.exports = { getCity };




