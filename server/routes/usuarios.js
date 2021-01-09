const router = require('express').Router();
const User = require('../models/User');
const autenticationMW = require('../middlewares/autenticacionMW');
const {paramUser} = require('../middlewares/validaParametros');

/**
 * DEVUELVE LOS DATOS DE MI PROPIO USUARIO.
 * - Ruta protegida por autenticación.
 */
router.get('/yo', autenticationMW, async (req, res) => {
    console.log(req.user);
    let usuarioActual = await User.findById(req.user._id).exec();
    console.log(usuarioActual)
    return res.send(usuarioActual);
});


/**
 * DEVUELVE TODOS LOS USUARIOS DEL SISTEMA.
 * - Ruta protegida por autenticación
 */
router.get('/', autenticationMW, async (req, res) => {
    let todosUsuarios = await User.find({}).exec();
    console.log(todosUsuarios)
    return res.send(todosUsuarios);
});


/**
 * DEVUELVE TODOS LOS USUARIOS QUE SIGO EN EL SISTEMA.
 * - Ruta protegida por autenticación
 */
router.get('/follow/', autenticationMW, async (req, res) => {
    let todosUsuarios = await User.findById(req.user._id).populate('sigue').exec();
    console.log(todosUsuarios)
    return res.send(todosUsuarios.sigue);
});



/**
 * DEVUELVE TODOS LOS FOLLOWERS QUE ME SIGUEN EN EL SISTEMA.
 * - Ruta protegida por autenticación
 */
router.get('/followers/', autenticationMW, async (req, res) => {
    const followers = await User.find({sigue:req.user._id}).exec();
    console.log(followers);
    return res.send(followers);
});


/**
 * HACER FOLLOW A UN USUARIO.
 * - Ruta protegida por autenticación
 * - Devuelve {ok : idUsuarioseguido} si se siguió a un usuario.
 * - Devuelve {error: mensaje} si se produjera algún error.
 */
router.post('/follow/:_id_usuario', autenticationMW, paramUser, async (req, res) => {
    const idUsuarioSeguir = req.params._id_usuario;
    //Comprobamos que existe el usuario que queremos seguir:

    let usuarioActual = await User.findById(req.user._id);
    
    //Ya le seguimos, no hacemos nada:
    if(usuarioActual.sigue.includes(idUsuarioSeguir)){ 
        return res.status(400).send({error: "Ya sigues a dicho usuario."});
    }

    //El usuario a seguir soy yo mismo, error:
    if(idUsuarioSeguir == usuarioActual._id){
        return res.status(400).send({error: "No puedo seguirme a mí mismo"});
    }

    //Efectivamente, le podemos empezar a seguir
    usuarioActual.sigue.push(idUsuarioSeguir);
    await usuarioActual.save();
    console.log(idUsuarioSeguir)

    return res.send({ok: idUsuarioSeguir});
});



/**
 * HACER FOLLOW A UN USUARIO.
 * - Ruta protegida por autenticación
 * - Devuelve {ok : idUsuarioseguido} si se siguió a un usuario.
 * - Devuelve {error: mensaje} si se produjera algún error.
 */
router.post('/unfollow/:_id_usuario', autenticationMW, paramUser, async (req, res) => {
    const idUsuarioDejarSeguir = req.params._id_usuario;
    
    let usuarioActual = await User.findById(req.user._id);

    //No le seguimos, no hacemos nada.
    if(!usuarioActual.sigue.includes(idUsuarioDejarSeguir)){ 
        return res.status(400).send({error: "No sigues a dicho usuario."});
    }

    //Efectivamente, le seguíamos, vamos a dejar de seguirle.
    usuarioActual.sigue.remove(idUsuarioDejarSeguir);
    usuarioActual.save();

    return res.send({ok: idUsuarioDejarSeguir});
    
});



module.exports = router;