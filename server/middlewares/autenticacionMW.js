const jwt = require('jsonwebtoken');


//Para el middleware
module.exports = function (req,res,next){
    console.log("MIDDLEWARE AUTENTICATIONMW");
    if(!req.header('Authorization')) return res.status(401).send({error:'Acceso Denegado. No hay token'});
    const token = req.header('Authorization').split(' ')[1]; //Nos quedamos con lo que está después de 'Bearer '
    if(!token) return res.status(401).send({error:'Acceso Denegado. Token incorrecto'});

    try{
        const usuarioVerificado = jwt.verify(token,process.env.TOKEN_SECRET);
        req.user = usuarioVerificado; //Lo añadimos a la petición para los siguientes manejadores
        next();
    }catch(err){
        res.status(400).send({error:'Token inválido'});
    }
}