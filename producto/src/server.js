require('dotenv').config();
const express = require('express');
const connectDB = require('./db');

const app = express();
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/producto', require('./routes/producto.routes'));

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
