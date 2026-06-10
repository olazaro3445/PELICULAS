const express = require('express');

const router = express.Router();

const Pelicula = require('../models/Pelicula');

const verificarToken = require('../middleware/auth');


// GET TODAS

router.get('/', verificarToken, async (req, res) => {

    const peliculas = await Pelicula.findAll();

    res.json(peliculas);

});


// GET POR ID

router.get('/:id', verificarToken, async (req, res) => {

    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {

        return res.status(404).json({
            mensaje: 'Película no encontrada'
        });

    }

    res.json(pelicula);

});


// POST

router.post('/', verificarToken, async (req, res) => {

    const nuevaPelicula = await Pelicula.create(req.body);

    res.json(nuevaPelicula);

});


// PUT

router.put('/:id', verificarToken, async (req, res) => {

    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {

        return res.status(404).json({
            mensaje: 'Película no encontrada'
        });

    }

    await pelicula.update(req.body);

    res.json({

        mensaje: 'Película actualizada',
        pelicula

    });

});


// DELETE

router.delete('/:id', verificarToken, async (req, res) => {

    const pelicula = await Pelicula.findByPk(req.params.id);

    if (!pelicula) {

        return res.status(404).json({
            mensaje: 'Película no encontrada'
        });

    }

    await pelicula.destroy();

    res.json({
        mensaje: 'Película eliminada'
    });

});

module.exports = router;