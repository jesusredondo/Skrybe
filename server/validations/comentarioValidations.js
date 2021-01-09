const Joi = require('@hapi/joi');

/**
 * Valida los datos de un nuevo comentario
 * @param {*} data  El cuerpo de la petición de nuevo comentario
 */
function validarComentarioNuevo(data){
    const schemaComentarioNuevo = Joi.object({
        mensaje: Joi.string().min(3).required()
    })
    return schemaComentarioNuevo.validate(data);
};


module.exports.validarComentarioNuevo = validarComentarioNuevo;
