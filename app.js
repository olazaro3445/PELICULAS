const express = require('express');
const cors = require('cors');

const sequelize = require('./database/db');

const peliculasRoutes = require('./routes/peliculas.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();


// Middleware

app.use(cors());
app.use(express.json());


// RUTAS

app.use('/auth', authRoutes);
app.use('/peliculas', peliculasRoutes);


// Base de datos

sequelize.sync().then(() => {

    console.log('Base de datos conectada');

    app.listen(3000, () => {

        console.log('Servidor corriendo en puerto 3000');

    });

});