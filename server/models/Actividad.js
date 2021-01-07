const mongoose = require('mongoose');

//MODELO PARA UNA ACTIVIDAD (GEOJSON):
const actividadSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
      },

    properties: {  //Esto dentro de otro Schema?
        name: {
            type: String,
            required: true,
            max: 255,
        },

        type:{
            type: String
        },

        time:{
            type: Date,
            required: true
        },

        _gpxType:{
            type: String,
            enum: ['trk'],
            required: true
        },

        coordTimes:[Date],

        heartRates: [Number],
    },

    geometry:{
        type: {
            type: String,
            enum: ['LineString','Path'],
            required: true
        },
        coordinates: [[Number]]

    },

    comentarios: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Comentario'}
    ],

    likes: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]



}
);

module.exports = mongoose.model('Actividad', actividadSchema);