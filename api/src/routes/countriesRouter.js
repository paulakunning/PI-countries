const { Router } = require('express');
const countriesRouter = Router();
const { Op } = require('sequelize');
const { getApiInfo } = require('../controllers/countriesController');
const { Country, Activity } = require('../db.js')


countriesRouter.get('/', async (req, res) => {
    const { name } = req.query
    try {
      const allCountries = await getApiInfo()
        if(name){
           let countryByName = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }, 
            include: {
              model: Activity,
              attributes: ['name', 'difficulty', 'duration', 'season'],
              through: {
                attributes:[]
            }
          }
        })
        res.status(200).send(countryByName)  
        } else {
          res.status(200).send(allCountries) 
        }
    } catch (error) {
        res.status(400).send(error.message)
    }    
})

countriesRouter.get('/:id', async (req, res) => { 
   const {id}  = req.params
   const countryId = id.slice(1).toUpperCase()

   if(!countryId) {return res.send('ID is required').status(400)}
   if (countryId && countryId.length === 3) {
    try {
      let countryById = await Country.findByPk(countryId, {
        include: {
          model: Activity,
          attributes: ['name'],
             through: {
               attributes:[]
           }
        },
      });
      return countryById ? res.send(countryById).status(200) : res.send('It does not exist a country with that id. Please try again').status(400)
    } catch (error) {
      return res.send(error.message).status(400);
    }
   } else {
    return res.send('It does not exist a country with that id. Please try again').status(400)
   }
})

module.exports = countriesRouter