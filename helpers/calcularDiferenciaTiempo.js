export default calcularTiempoVuelo = (vuelo) => {
    const horaInicio = vuelo?.horasalida?.split(":");
    const horaFin = vuelo?.horallegada?.split(":");

    const horaInicioMinutos =
      parseInt(horaInicio[0]) * 60 + parseInt(horaInicio[1]);
    const horaFinMinutos = parseInt(horaFin[0]) * 60 + parseInt(horaFin[1]);

    let diferencia = horaFinMinutos - horaInicioMinutos;
    if (diferencia < 0) { 
      diferencia = horaFinMinutos - horaInicioMinutos + 24 * 60;
    }

    const horas = Math.floor(diferencia / 60);
    const minutos = diferencia % 60;

    return `${horas}h ${minutos}m`;
  };
