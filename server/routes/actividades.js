const router = require('express').Router();
const Feature = require('../models/Feature');
const autenticationMW = require('../middlewares/autenticacionMW');

/**
 * DEVUELVE TODAS LAS ACTIVIDADES DEL SISTEMA DE MANERA SIMPLIFICADA
 * - Ruta protegida por autenticación.
 * - Devuelve un array con objetos que representan las actividades simplificadas:
 *      el nombre (properties.name), fecha(properties.time) e ID(_id) de las actividades.
 */
router.post('/', autenticationMW, async (req, res) => {
    let todasActividades = await Feature.find({},'properties.name properties.time').exec();
    console.log(todasActividades)
    res.send(todasActividades);
});


/**
 * DEVUELVE UNA ACTIVIDAD POR ID, DE MANERA COMPLETA
 * - 
 */
router.post('/:_id', autenticationMW, async (req, res) => {
    let _id = req.params._id
    console.log(_id);

    //Encontramos la actividad con ese ID:
    try{
        let actividad = await Feature.findById({"_id" : _id}).exec();
        res.send(actividad);
    }catch(error){
        res.status(404).send({error:'No existe esa actividad.'});
    }

});



module.exports = router;