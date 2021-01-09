const mongoose = require('mongoose');

//MODELO PARA COMENTARIO:
const comentarioSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    mensaje:{
        type: String,
        required: true
    }
},
{timestamps: true});


module.exports = mongoose.model('Comentario', comentarioSchema); 