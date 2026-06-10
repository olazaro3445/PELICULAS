const { DataTypes } = require('sequelize');

const sequelize = require('../database/db');

const Pelicula = sequelize.define('Pelicula', {

    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    director: {
        type: DataTypes.STRING,
        allowNull: false
    },

    anio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    genero: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Pelicula;