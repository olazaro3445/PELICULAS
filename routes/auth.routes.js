const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario');


// REGISTRO

router.post('/registro', async (req, res) => {

    try {

        const salt = await bcrypt.genSalt(10);

        const passwordHash = await bcrypt.hash(
            req.body.password,
            salt
        );

        const usuario = await Usuario.create({

            usuario: req.body.usuario,
            password: passwordHash

        });

        res.json(usuario);

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

});


// LOGIN

router.post('/login', async (req, res) => {

    try {

        const usuario = await Usuario.findOne({

            where: {
                usuario: req.body.usuario
            }

        });

        if (!usuario) {

            return res.status(400).json({
                mensaje: 'Usuario incorrecto'
            });

        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            usuario.password
        );

        if (!validPassword) {

            return res.status(400).json({
                mensaje: 'Contraseña incorrecta'
            });

        }

        const token = jwt.sign(

            {
                id: usuario.id
            },

            'secretoJWT',

            {
                expiresIn: '1h'
            }

        );

        res.json({
            token
        });

    } catch (error) {

        res.status(500).json({
            mensaje: error.message
        });

    }

});

module.exports = router;