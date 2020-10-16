const express = require('express');
const app = express();


//IMPORTAR RUTAS:
const authRoute = require('./routes/auth');



//MIDDLEWARES:
//Para parsear el body de la petición como JSON:
app.use(express.json());
//Mis middlewares:
//Para autorización:
app.use('/api/auth', authRoute);





//LANZAMOS EL SERVIDOR:
app.listen(3000, ()=>console.log('Servidor escuchando en el puerto 3000'));

    