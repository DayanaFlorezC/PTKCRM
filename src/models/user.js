const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    salario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false
    },
    rol:{
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,   
    },
});

const syncModels = async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('Error al sincronizar los modeloxfds:', error);
    }
};

syncModels()

module.exports = { User };
