import React from 'react';

const ResumenExport = ({ data, imgBarChart, imgPieChart }) => {
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif', fontSize: '14px' }}>
      <h2>Ficha Síntesis del Programa</h2>
      <p>Provincia: {data.provincia}</p>
      <p>Departamentos: {data.departamentos.join(', ')}</p>
      <p>Unidades Educativas: {data.escuelas}</p>
      <p>Docentes: {data.docentes}</p>
      <p>Presupuesto Total: ${data.presupuestoTotal}</p>
      <p>Costo Total: ${data.costoTotal}</p>

      <hr style={{ margin: '1rem 0' }} />

      <h3>Presupuesto según origen</h3>
      {imgBarChart && <img src={imgBarChart} style={{ width: '100%' }} alt="Gráfico de Barras" />}

      <h3>Distribución de Costos</h3>
      {imgPieChart && <img src={imgPieChart} style={{ width: '100%' }} alt="Gráfico de Torta" />}
    </div>
  );
};

export default ResumenExport;
