const router = require('express').Router();
const User = require('../models/User');
const Credencial = require('../models/Credencial');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validarUsuarioSignin,
    validarUsuarioLogin} = require('../validations/userValidations');

/** RUTA SIGNIN:**/
router.post('/signin',async(req,res)=>{
    //TODO: Eliminar estos console.log
    console.log(req.body);
    console.log(req.fields);

    const { error } = validarUsuarioSignin(req.fields); //IMPORTANTE: Checkeamos que los campos de la petición son correctos.
    if(error){
        return res.status(400).send({error: error}); //Campos incorrectos
    }

    //Comprobamos si existe una credencial con ese mail:
    //NOTA: pueden existir varios usuarios con mismos nombres y apellidos.
    const credencialMailExists = await Credencial.findOne({ email : req.fields.email });
    if(credencialMailExists){
        return res.status(400).send({error:'No puedes registrarte. Ya hay un usuario registrado con ese mail.'});
    }
    

    //Hash para contraseña y la actualizamos en fields.
    const salt = await bcrypt.genSalt(10); //Valor seguro pero no mucho tiempo
    const hashedPassword = await bcrypt.hash(req.fields.password, salt);
    req.fields.password = hashedPassword;
    

    //Creamos el usuario en la BBDD:
    const newUser = {
        nombre : req.fields.nombre,
        apellidos : req.fields.apellidos,
        email : req.fields.email,
    }
    //Si se sube con imagen, la ponemos:
    if(req.fields.imagen){
        newUser.imagen = imagen;
    }
    const userDB = new User(newUser)
    let savedUser = null;
    try{
         savedUser = await userDB.save();
    }catch(err){
        res.status(400).send({error:err});
    } 

    
    //Creamos la credencial en la BBDD:
    const newCredencial = {
        user_id: savedUser._id,
        email: req.fields.email,
        password: hashedPassword
    }
    const credencialDB = new Credencial(newCredencial);
    try{
        const savedCredencial = await credencialDB.save();
    }catch(err){
        //Eliminamos el usuario creado:
        savedUser.remove().exec()
        //Devolvemos el error
        res.status(400).send({error:err});
    } 


    //Si todo funciona correctamente símplemente devolvemos el mail del usuario
    res.send({user: savedUser.email});
});


/** RUTA LOGIN:**/
router.post('/login',async(req,res)=>{
    //TODO: Eliminar estos console.log
    console.log(req.body);
    console.log(req.fields);

    const { error } = validarUsuarioLogin(req.fields);
    if(error){
        return res.status(400).send(error); //Campos incorrectos
    }

    //Comprobamos si existe un credencial con ese mail.
    const credencial = await Credencial.findOne({ email : req.fields.email });
    if(!credencial){
        return res.status(400).send({error:'No existe ningún registro con ese mail.'});
    }

    //Comprobamos si la pass es correcta:
    const passCorrecta = await bcrypt.compare(req.fields.password, credencial.password);
    if(!passCorrecta){
        return res.status(400).send({error:'Contraseña incorrecta'});
    }

    //Comprobamos que existe un Usuario asociado a esa credencial:
    const usuario = await User.findById(credencial.user_id);
    if(!usuario){
        return res.status(400).send({error:'No existe un Usuario asociado a dicho credencial'})
    }

    //Crear y enviar el token (OJO: Enviamos el user_id en el token, no el credencial_id)
    const token = jwt.sign({_id: credencial.user_id}, process.env.TOKEN_SECRET);
    res.send(
        {
            'access_token': token, 
            'token_type':'Bearer',
            'usuario': usuario,
        }
        );
});


module.exports = router;