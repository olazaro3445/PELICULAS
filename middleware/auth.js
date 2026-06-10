const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            mensaje: 'Acceso denegado'
        });
    }

    try {

        const verified = jwt.verify(
            token.replace('Bearer ', ''),
            'secretoJWT'
        );

        req.usuario = verified;

        next();

    } catch (error) {

        return res.status(400).json({
            mensaje: 'Token inválido'
        });

    }
};

module.exports = verificarToken;