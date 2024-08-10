const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const getEmpleados = async (req, res) => {
    try {

        const limit = +req.query?.limit || 5
        const page = +req.query?.page || 1

        const { count, rows: users } = await User.findAndCountAll({
            where: {
                rol: 'empleado'
            },
            limit: limit,
            offset: (page-1)*limit
        });

        res.json({users, count});

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const limit = +req.query?.limit || 5
        const page = +req.query?.page || 1

        const { count, rows: users } = await User.findAndCountAll({
            limit: limit,
            offset: (page-1)*limit
        });
        res.json({users, count});
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const getEmpleado = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {

        //validations here

        const userNew = {
            nombre: req.body.nombre,
            salario: req.body.salario,
            fechaIngreso: new Date(req.body.fechaIngreso),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            rol: req.body.rol
        }

        const user = await User.create(userNew);
        res.json(user);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {

    try {

        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const validPassword = bcrypt.compareSync(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const token = jwt.sign({ id : user.id, email: user.email, rol: user.rol }, 'secretkey');

        res.json({user, token});

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const deleteEmpleado = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        if (user.rol === 'admin') {
            return res.status(403).json({ message: 'No puedes eliminar un administrador' });
        }

        await user.destroy();
        res.json({ message: 'Empleado eliminado', user });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

const updateEmpleado = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'Empleado no encontrado' });
        }

        if (user.rol === 'admin') {
            return res.status(403).json({ message: 'No puedes actualizar un administrador' });
        }

        if(req.body.password){
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }

        await user.update(req.body);

        res.json({ message: 'Empleado actualizado' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getEmpleados,
    getEmpleado,
    createUser,
    deleteEmpleado,
    updateEmpleado,
    getAllUsers,
    updateUser,
    login
};