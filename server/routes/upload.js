const router = require('express').Router();
const autenticationMW = require('../middlewares/autenticacionMW');

const fs = require('fs');
const path = require('path');

//Modelos del Schema:
const User = require('../models/User')
const Actividad = require('../models/Actividad')

//PARA LA CONVERSIÓN A GEOJSON:
const tj = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;



/**
 * SUBE UN FICHERO .
 * - Ruta protegida por autenticación.
 */
router.post('/routeGPX', autenticationMW, async (req, res) => {
    console.log(req.files.file);
    console.log("-----------");
    const originalName = req.files.file.name;
    console.log(originalName);
    const fileUploadedPath = path.join(__dirname, '..','uploads','GPX', originalName)
    await fs.promises.rename(req.files.file.path, fileUploadedPath, function (err) {
        if (err) {
            res.status(500).send(err);
        }
    })
    

    //Procesamos el fichero para convertirlo en GeoJSON:
    const gpx = new DOMParser().parseFromString(fs.readFileSync(fileUploadedPath, "utf8"));
    const geoJSON = tj.gpx(gpx);
    console.log(geoJSON)

    //Sacamos el usuario que está subiendo la info:
    let usuarioActual = await User.findById(req.user._id).exec();
    console.log(usuarioActual)
    if(!usuarioActual){
        return res.status(400).send({error: "No existe el usuario asociado a la subida en la BBDD"}); //TODO: Revisas status HTTP
    }

    //Lo subimos al servidor como una de las rutas del usuario actual
    //TODO: Falta hacer todas las comprobaciones empleando el usuario actual, por ahora simplemente subimos el Feature.
    //1) Comprobamos si ya existe uno con la misma fecha exacta en la BBDD:
    const geoJSONFeature = geoJSON.features[0]
    console.log(geoJSONFeature.properties.time)
    const activityExists = await Actividad.findOne({ 'properties.time' : geoJSONFeature.properties.time}  );
    if(activityExists){
        //1.1) Tiene que ser la misma fecha y además para el mismo usuario: 
        const actividadMismaFechaUsuario = User.find({_id: usuarioActual._id, actividades: activityExists._id})
        if(actividadMismaFechaUsuario){
            return res.status(400).send({error:'No puedes subir esta actividad, ya existe una similar en BBDD'});
        }
        
    }
    
    //2) Comprobamos que cumple el schema:
    //TODO: Validar?

    //3) Lo guardamos:
    const actividadBD = new Actividad(geoJSONFeature)
    try{
        const actividadBDSaved = await actividadBD.save();
        usuarioActual.actividades.push(actividadBD._id);
        await usuarioActual.save();
        res.send({track: actividadBDSaved._id});
    }catch(err){
        res.status(400).send({error:err});
    } 
    


});



module.exports = router;