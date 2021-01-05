const mongoose = require('mongoose');

//MODELO PARA UN FEATURE (GEOJSON):
const featureSchema = new mongoose.Schema({
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

    }


}
);

module.exports = mongoose.model('Feature', featureSchema);