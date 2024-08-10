const express = require('express');
const router = express.Router();
const authFunction = require('../middlewares/auth')
const adminMiddleware = require('../middlewares/adminMiddleware')

const {
    getEmpleados,
    createUser,
    getEmpleado,
    getAllUsers,
    deleteEmpleado,
    updateEmpleado,
    login
} = require('../controllers/userController');


// Ruta para obtener todos los empleados
router.get('/empleados', authFunction, adminMiddleware, getEmpleados);

// Ruta para crear un empleado o administrador
router.post('/empleados', authFunction, adminMiddleware, createUser);

// Ruta para obtener un empleado
router.get('/empleados/:id',authFunction, getEmpleado);

// Ruta para obtener todos los usuarios
router.get('/users',authFunction, adminMiddleware, getAllUsers);

// Ruta para eliminar un usuario
router.delete('/empleados/:id', authFunction, adminMiddleware, deleteEmpleado);

// Ruta para actualizar un usuario
router.put('/empleados/:id', authFunction, adminMiddleware, updateEmpleado);

// Ruta para logear un usuario
router.post('/login', login);


module.exports = router;