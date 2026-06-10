const { DataTypes } = require('sequelize');

const sequelize = require('../database/db');

const Usuario = sequelize.define('Usuario', {

    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Usuario;