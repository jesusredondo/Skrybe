const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const formidable = require('express-formidable');
const cors = require('cors');

//IMPORTAR VALORES DE ENV:
dotenv.config();

//CONECTAR CON LA BD (1 vez para toda la aplicación):
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true },
    ()=> console.log('Connected to DB'));


//IMPORTAR RUTAS:
const authRoute = require('./routes/auth');
const usuariosRoute = require('./routes/usuarios');


//Páginas estáticas:
app.use(express.static('../client-mockup'));


//MIDDLEWARES:
//Parsear el body como un objeto json:
app.use(express.json());
//Parsear los formularios con objeto json:
app.use(formidable());
//Activar el CORS:
app.use(cors());






//Mis rutas:
//Para autorización:
app.use('/api/auth', authRoute);

//para consulta:
app.use('/api/usuarios', usuariosRoute);




//LANZAMOS EL SERVIDOR:
app.listen(3000, ()=>console.log('Servidor escuchando en el puerto 3000'));

    