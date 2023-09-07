const express = require('express');
const router = express.Router();
const validaciones = require('../validaciones');

const ciudadanosDB = [];

router.post('/', (req, res) => {
  const { nombres, apellidos, DPI, fechaNacimiento, estadoCivil } = req.body;

  const nuevoCiudadano = {
    nombres,
    apellidos,
    DPI,
    fechaNacimiento,
    estadoCivil,
  };
  console.log(nombres, apellidos, DPI, fechaNacimiento, estadoCivil);
  ciudadanosDB.push(nuevoCiudadano);
  res.status(201).json({ mensaje: 'Ciudadano agregado' });
});

module.exports = router;

router.put('/:dpi', (req, res) => {
    const dpi = req.params.dpi;
    const { nombres, apellidos, fechaNacimiento, estadoCivil } = req.body;

    const ciudadano = ciudadanosDB.find(c => c.DPI === dpi);
  
    if (!ciudadano) {
      return res.status(404).json({ mensaje: 'Ciudadano no encontrado' });
    }

    if (!validaciones.validarFechaNacimiento(fechaNacimiento) || !validaciones.validarEstadoCivil(estadoCivil)) {
      return res.status(400).json({ mensaje: 'Datos no validos' });
    }

    ciudadano.nombres = nombres;
    ciudadano.apellidos = apellidos;
    ciudadano.fechaNacimiento = fechaNacimiento;
    ciudadano.estadoCivil = estadoCivil;
    
    res.json({ mensaje: 'Datos del ciudadano actualizados' });
  });
  
router.delete('/:dpi', (req, res) => {
    const dpi = req.params.dpi;
  
    const index = ciudadanosDB.findIndex(c => c.DPI === dpi);
  
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Ciudadano no encontrado' });
    }
  
    ciudadanosDB.splice(index, 1);
  
    res.json({ mensaje: 'Ciudadano eliminado exitosamente' });
  });
  
router.get('/:dpi', (req, res) => {
    const dpi = req.params.dpi;
  
    const ciudadano = ciudadanosDB.find(c => c.DPI === dpi);
  
    if (!ciudadano) {
      return res.status(404).json({ mensaje: 'Ciudadano no encontrado' });
    }
  
    res.json(ciudadano);
  });
  
router.get('/', (req, res) => {
    res.json(ciudadanosDB);
  });
  