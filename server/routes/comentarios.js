const router = require('express').Router();
const User = require('../models/User');
const Actividad = require('../models/Actividad');
const Comentario = require('../models/Comentario');
const autenticationMW = require('../middlewares/autenticacionMW');
const paramActividad = require('../middlewares/validaParametros').paramActividad;
const {validarComentarioNuevo} = require('../validations/comentarioValidations');


/**
 * DEVUELVE LOS COMENTARIOS DE UNA ACTIVIDAD.
 * - Ruta protegida por autenticación.
 */
router.get('/:_id_actividad', autenticationMW, paramActividad, async (req, res) => {
    let idActividad = req.params._id_actividad;

    try{
        let actividadComentarios = await Actividad.findById(idActividad,'comentarios').populate({ 
            path: 'comentarios',
            populate: {
              path: 'user_id',
              model: 'User',
              select: 'nombre'
            } 
         }).exec();
        console.log(actividadComentarios.comentarios);
        return res.send(actividadComentarios.comentarios);

    } catch(error){
        return res.status(400).send({error: 'ID de actividad incorrecto'})
    }
});



/**
 * AÑADE UN COMENTARIO A UNA ACTIVIDAD.
 * - Ruta protegida por autenticación.
 * - El mensaje del comentario llega en el cuerpo del Post
 */
router.post('/:_id_actividad', autenticationMW, paramActividad, async (req, res) => {

    const { error } = validarComentarioNuevo(req.fields);
    if(error){
        return res.status(400).send(error); //Campos incorrectos
    }
   
    const nuevoComentario = {
        mensaje : req.fields.mensaje,
        user_id : req.user._id,
    }

    //Guardamos el comentario
    let comentarioBD = null;
    try{
        comentarioBD = new Comentario(nuevoComentario);
        comentarioBD.save();
    } catch(error){
        return res.status(400).send({error:"Error al guardar el comentario"});
    }

    //Marcamos dicho comentario para la actividad:
    let actividad = await Actividad.findById(req.params._id_actividad).exec(); //Ya nos hemos asegurado que existe en el middleware.
    actividad.comentarios.push(comentarioBD._id);
    await actividad.save();

    return res.send({ok: comentarioBD._id});

});




module.exports = router;