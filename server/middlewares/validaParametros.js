const Actividad = require('../models/Actividad');
const User = require('../models/User');



 async function paramActividad(req,res,next) {
    console.log('MIDDELWARE PARAM-ACTIVIDAD');

    let _id = req.params._id_actividad

    //Encontramos la actividad con ese ID:
    try{
        let actividad = await Actividad.findById(_id,'_id').exec();
        if(!actividad){
            return res.status(404).send({error:'No existe dicha actividad.'});
        }
        next();
    }catch(error){
        return res.status(404).send({error:'No es un ID de actividad válido.'});
    }
}

async function paramUser(req,res,next) {
    console.log('MIDDELWARE PARAM-USUARIO');

    let _id = req.params._id_usuario

    //Encontramos el usuario con ese ID:
    try{
        let usuario = await User.findById(_id,'_id').exec();
        if(!usuario){
            return res.status(404).send({error:'No existe dicho usuario.'});
        }
        next();
    }catch(error){
        return res.status(404).send({error:'No es un ID de usuario válido.'});
    }
}


module.exports = {
    paramActividad : paramActividad,
    paramUser : paramUser
}