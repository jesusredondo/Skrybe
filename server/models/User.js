const mongoose = require('mongoose');

//MODELO PARA UN USUARIO:
const userSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        max: 255,
        min: 3,
    },
    apellidos:{
        type: String,
        required: true,
        max: 255,
        min: 3,        
    },
    email:{
        type: String,
        required : true,
        max: 255,
        min: 6
    },
    imagen: {
        type: String,
        max:1024
    },
    actividades:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'Actividad'}
    ],
    sigue:[
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]

},
{timestamps: true});


module.exports = mongoose.model('User', userSchema);