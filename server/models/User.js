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
    password: {
        type: String,
        required : true,
        max: 1024,
        min: 6
    },
    imagen: {
        type: String,
        max:1024
    }

},
{timestamps: true});


module.exports = mongoose.model('User', userSchema);