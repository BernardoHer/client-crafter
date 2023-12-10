// db.js
const mongoose = require('mongoose');
const config = require('./config');

const {URIDB} = config;

const connectDB = async () => {
  try {
    await mongoose.connect(
      URIDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1); // Salir de la aplicación en caso de error de conexión
  }
};

module.exports = connectDB;
