const router = require('express').Router();
const User = require('../models/User');
const autenticationMW = require('../middlewares/autenticacionMW');

/**
 * DEVUELVE LOS DATOS DE MI PROPIO USUARIO.
 * - Ruta protegida por autenticación.
 */
router.post('/yo', autenticationMW, async (req, res) => {
    console.log(req.user);
    let usuarioActual = await User.findById(req.user._id).exec();
    console.log(usuarioActual)
    res.send(usuarioActual);
});


/**
 * DEVUELVE TODOS LOS USUARIOS DEL SISTEMA.
 * - Ruta protegida por autenticación
 */
router.post('/', autenticationMW, async (req, res) => {
    let todosUsuarios = await User.find({}).exec();
    console.log(todosUsuarios)
    res.send(todosUsuarios);
});


module.exports = router;