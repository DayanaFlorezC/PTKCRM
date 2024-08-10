const jwt = require('jsonwebtoken')

const authFunction = async (req, res, next)=>{

    try {

        const token = req.headers['authorization']

        if(!token) return res.status(401).json({mensaje: 'No hay token'})

        const tokenWithoutBearer = token.split(' ')[1]

        const decoded = jwt.verify(tokenWithoutBearer, 'secretkey'); //agregar esto a variables de entorno

        req.user = decoded;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Acceso denegado. Token no válido.' });
    }

}

module.exports = authFunction; 