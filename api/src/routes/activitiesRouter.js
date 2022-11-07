const express = require('express')
const { Country, Activity } = require('../db.js')

const activitiesRouter = express.Router();

activitiesRouter.get('/', async (req, res) => {
    const allActivities = await Activity.findAll({include: [Country]})
    res.send(allActivities)
})

activitiesRouter.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
        try {
            const newActivity = await Activity.create({name, difficulty, duration, season})
            const countryActivity = await Country.findAll({
                where: { name: countries }
            })
            newActivity.addCountry(countryActivity)
            res.status(200).send('Activity created successfully')
        } catch (error) {
            res.status(400).send(error.message)
        }
})

module.exports = activitiesRouter

/* ID
Nombre
Dificultad (Entre 1 y 5)
Duración
Temporada (Verano, Otoño, Invierno o Primavera)
 */