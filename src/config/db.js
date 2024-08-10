const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  database: 'postgres',
  username: 'postgres',
  password: 'chimuelo',
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

const authenticateDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida correctamente.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

authenticateDatabase();

module.exports = sequelize;
