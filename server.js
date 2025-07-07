const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/Cinesario', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Esquema de ejemplo
const Usuario = mongoose.model('Usuario', {
  nombre: String,
  email: String,
});

// Ruta para obtener usuarios
app.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.find();
  res.json(usuarios);
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:27017');
});

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexión a MongoDB Atlas exitosa'))
  .catch(err => console.error(err));
