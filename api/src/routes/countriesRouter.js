const { Router } = require('express');
const countriesRouter = Router();
const { Op } = require('sequelize');
const { getApiInfo } = require('../controllers/countriesController');
const { Country, Activity } = require('../db.js')


countriesRouter.get('/', async (req, res) => {
    const { name } = req.query
    try {
        if(name){
           let countryByName = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }, 
            include: [Activity]
        })
        res.status(200).send(countryByName)  
        } else {
                const allCountries = await getApiInfo()
                res.status(200).send(allCountries) 
        }
    } catch (error) {
        res.status(400).send(error.message)
    }    
})

countriesRouter.get('/:id', async (req, res) => { 
   const { id } = req.params;
   try {
     if (id) {
       let countryById = await Country.findByPk(id.toUpperCase().slice(1), {
         include: {
           model: Activity,
         },
       });
       countryById ? res.send(countryById).status(200) : res.send('It does not exist a country with that id. Please try again').status(400)
     }
   } catch (error) {
     res.send(error.message).status(400);
   }
})

module.exports = countriesRouter