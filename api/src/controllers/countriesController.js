const axios = require('axios')
const { Country, Activity } = require('../db.js')
const url = 'https://restcountries.com/v3.1/all'

const getApiInfo = async () => {
    const request = await axios.get(url)
    const countries = request.data.forEach(c => {
        Country.bulkCreate({
            where: {
                id: c.cca3,
                name:c.name.common,
                flag:c.flags[1],
                capital: c.capital ? c.capital[0] : "The country does not have a capital city",
                continent: c.continents[0], 
                subregion: c.subregion ? c.subregion : "",
                area: c.area,
                population: c.population
            }
        })
    })
    const allCountries = await Country.findAll({
        include: [Activity]
    })
    return allCountries
}

module.exports = {
    getApiInfo
}