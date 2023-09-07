const express = require('express');
const app = express();
const puerto = 3000; // Puerto en el que se ejecutará la aplicación

app.use(express.json());

// Importar y montar las rutas de registro de ciudadanos
const registroCiudadanosRoutes = require('./api/registro/ciudadanos');
app.use('/api/registro/ciudadanos', registroCiudadanosRoutes);

app.listen(puerto, () => {
  console.log(`Servidor escuchando en el puerto ${puerto}`);
});
