const router = require('express').Router();
const User = require('../models/User');
const Actividad = require('../models/Actividad');
const autenticationMW = require('../middlewares/autenticacionMW');
const {paramActividad, paramUser} = require('../middlewares/validaParametros');

/**
 * DEVUELVE TODAS LAS ACTIVIDADES DEL USUARIO DE MANERA SIMPLIFICADA
 * - Ruta protegida por autenticación.
 * - Devuelve un array con objetos que representan las actividades simplificadas:
 *      el nombre (properties.name), fecha(properties.time) e ID(_id) de las actividades.
 */
router.get('/', autenticationMW, async (req, res) => {
    let todasActividades = await User.findById(req.user).populate('actividades','properties.name properties.time').exec();
    console.log(todasActividades)
    return res.send(todasActividades.actividades);
});

/**
 * DEVUELVE TODAS LAS ACTIVIDADES DEL UN USUARIO EN CONCRETO DE MANERA SIMPLIFICADA
 * - Ruta protegida por autenticación.
 * - Devuelve un array con objetos que representan las actividades simplificadas:
 *      el nombre (properties.name), fecha(properties.time) e ID(_id) de las actividades.
 */
router.get('/usuario/:_id_usuario', autenticationMW, paramUser, async (req, res) => {
    console.log("TESTING")
    let todasActividades = await User.findById(req.params._id_usuario).populate('actividades','properties.name properties.time').exec();
    console.log(todasActividades)
    return res.send(todasActividades.actividades);
});


/**
 * DEVUELVE UNA ACTIVIDAD POR ID, DE MANERA COMPLETA
 * - 
 */
router.get('/:_id_actividad', autenticationMW, paramActividad, async (req, res) => {
    let _id = req.params._id_actividad
    console.log(_id);
    //Encontramos la actividad con ese ID (Ya nos aseguramos en el middleware que existía):
    let actividad = await Actividad.findById({"_id" : _id}).exec();
    return res.send(actividad);
});



module.exports = router;