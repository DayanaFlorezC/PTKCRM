const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');


const Request = sequelize.define('Request', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    resumen:{
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            len: [2, 50]
        }
    },
    descripcion:{
        type: DataTypes.STRING(50),
        allowNull:false,
        validate: {
            len: [2, 50]
        }
    },
    id_empleado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foranea: true,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    fechaSolicitud: {
        type: DataTypes.DATE,
        allowNull: false
    }
    
});


const syncModels = async () => {
    try {
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Error al sincronizar los modelos:', error);
    }
};

syncModels();

module.exports = {Request};
