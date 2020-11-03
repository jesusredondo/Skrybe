const Joi = require('@hapi/joi');

/**
 * Valida los datos de una petición de Signin
 * @param {*} data  El cuerpo de la petición de Signin
 */
function validarUsuarioSignin(data){
    const schemaUsuarioSignin = Joi.object({
        nombre: Joi.string().min(3).max(255),//.required(),
        apellidos: Joi.string().min(3).max(255),//.required(),
        email: Joi.string().min(6).max(255),//.required().email(),
        password: Joi.string().min(6).max(1024),//.required(),
        imagen: Joi.string().max(1024)
    })
    return schemaUsuarioSignin.validate(data);
};


/**
 * Valida los datos de una petición de Login
 * @param {*} data  El cuerpo de la petición de Login
 */
function validarUsuarioLogin(data){
    const schemaUsuarioLogin = Joi.object({
        email: Joi.string().min(6).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
    })
    return schemaUsuarioLogin.validate(data);
};




module.exports.validarUsuarioSignin = validarUsuarioSignin;
module.exports.validarUsuarioLogin = validarUsuarioLogin;