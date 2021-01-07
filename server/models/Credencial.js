const { string } = require('@hapi/joi');
const mongoose = require('mongoose');


//MODELO PARA CREDENCIAL:
const credencialSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    email:{
        type: String,
        required : true,
        trim: true,
        max: 255,
        min: 6,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'No es un Email válido.']
    },
    password: {
        type: String,
        required : true,
        max: 1024,
        min: 6
    }
   
},
{timestamps: true});


module.exports = mongoose.model('Credencial', credencialSchema);