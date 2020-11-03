const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {validarUsuarioSignin,
    validarUsuarioLogin} = require('../validations/userValidations');

/** RUTA SIGNIN:**/
router.post('/signin',async(req,res)=>{
    //TODO: Eliminar estos console.log
    console.log(req.body);
    console.log(req.fields);

    const { error } = validarUsuarioSignin(req.fields);
    if(error){
        return res.status(400).send({error: error}); //Campos incorrectos
    }

    //Checking if user is already in the database:
    const emailExists = await User.findOne({ email : req.fields.email });
    if(emailExists){
        return res.status(400).send({error:'No puedes registrarte. Ya existe ese email.'});
    }
    

    //Hash para contraseña y la actualizamos en fields.
    const salt = await bcrypt.genSalt(10); //Valor seguro pero no mucho tiempo
    const hashedPassword = await bcrypt.hash(req.fields.password, salt);
    req.fields.password = hashedPassword;
    
    //Creamos el usuario en la BD:
    const user = new User(req.fields)
    try{
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    }catch(err){
        res.status(400).send({error:err});
    } 
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

    //Comprobamos si existe el usuario
    const usuario = await User.findOne({ email : req.fields.email });
    if(!usuario){
        return res.status(400).send({error:'No existe el email del usuario'});
    }

    //Comprobamos si la pass es correcta:
    const passCorrecta = await bcrypt.compare(req.fields.password, usuario.password);
    if(!passCorrecta){
        return res.status(400).send({error:'Contraseña incorrecta'});
    }

    //Crear y enviar el token:
    const token = jwt.sign({_id: usuario._id}, process.env.TOKEN_SECRET);
    res.send({'access_token': token, 'token_type':'Bearer'});
});


module.exports = router;