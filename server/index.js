const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
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



//MIDDLEWARES:
//Cors
app.use(cors());

//Para parsear el body de la petición como JSON:
app.use(express.json());
//Mis middlewares:
//Para autorización:
app.use('/api/auth', authRoute);





//LANZAMOS EL SERVIDOR:
app.listen(3000, ()=>console.log('Servidor escuchando en el puerto 3000'));

    