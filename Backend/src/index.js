const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const config = require('./config')
const userRoutes = require('./routes/userRoutes');
const purchaseRoutes = require('./routes/purchaseRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const {PORT} = config;
const app = express();
app.use(cors());
// Conectar a MongoDB
connectDB();

  
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api', purchaseRoutes);
// Middleware para manejar errores
app.use(errorMiddleware);

  
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });