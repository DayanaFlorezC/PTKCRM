const express = require('express');
const router = express.Router();
const authFunction = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/adminMiddleware')

const {
    createRequest,
    getRequests,
    getRequestById,
    getRequestByUser,
    deleteRequest
} = require('../controllers/requestController')


// Ruta para obtener todos los requests
router.get('/solicitudes', authFunction, adminMiddleware, getRequests);

// Ruta para obtener un request
router.get('/solicitud/:id',authFunction, getRequestById)

//Ruta para crear request 
router.post('/solicitud', authFunction, createRequest)

//Ruta para obtener todas las solicitudes de un usuario
router.post('/solicitud/:userId', getRequestByUser)

// Ruta para eliminar solicitud 
router.delete('/solicitud/:id', authFunction, adminMiddleware, deleteRequest)


module.exports = router;