function validarDPI(dpi) {
    const regex = /^\d{13}$/;
    return regex.test(dpi);
  }
  
  function validarFechaNacimiento(fechaNacimiento) {
    const fechaNac = new Date(fechaNacimiento);
    const fechaActual = new Date();
    return fechaNac < fechaActual;
  }
  
  function validarEstadoCivil(estadoCivil) {
    const estadosCivilesPermitidos = ["soltero", "casado", "divorciado"];
    return estadosCivilesPermitidos.includes(estadoCivil.toLowerCase());
  }
  
  module.exports = {
    validarDPI,
    validarFechaNacimiento,
    validarEstadoCivil,
  };
  