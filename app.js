require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./database/db');

const peliculasRoutes = require('./routes/peliculas.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/peliculas', peliculasRoutes);

sequelize.sync().then(() => {

    console.log('Base de datos conectada');

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en puerto ${PORT}`);
    });

});