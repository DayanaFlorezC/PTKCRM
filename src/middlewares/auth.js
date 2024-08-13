const jwt = require('jsonwebtoken')

const authFunction = async (req, res, next) => {

    try {

        const token = req.headers['authorization']

        console.log(token, 'ususu')

        if (!token) return res.status(401).json({ mensaje: 'No hay token' })

        console.log('k y aca')

        const tokenWithoutBearer = token.split(' ')[1]

        let decoded;

        if(tokenWithoutBearer=== undefined){
             decoded = jwt.verify(token, 'secretkey');
        }else{
            decoded = jwt.verify(tokenWithoutBearer, 'secretkey');
        }

        req.user = decoded;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: 'Acceso denegado. Token no válido.' });
    }

}

module.exports = authFunction; 