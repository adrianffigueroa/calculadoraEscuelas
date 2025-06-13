import Papa from 'papaparse';
import { useEffect, useState } from 'react';

const URL_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFKcmbdg9l3x6Xw2pr_yuTLBpecRRzOLXz6K5q-i__lsWuPa6HmJ-CGCVq1MRMsauZDwcqpZ2oRFFI/pub?gid=0&single=true&output=csv';

function normalizarTexto(str) {
  return str
    ?.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export default function useEscuelasFiltradas(departamentos) {
  const [escuelas, setEscuelas] = useState([]);
  const [filtradas, setFiltradas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: (result) => {
        setEscuelas(result.data);
        setLoading(false);
      },
      error: () => {
        setLoading(false);
      },
    });
  }, []);

  useEffect(() => {
    if (escuelas.length === 0) return;

    const dptosNorm = departamentos?.map(normalizarTexto);

    const resultado = escuelas.filter((fila) => {
      const dpto = normalizarTexto(fila.Departamento);
      const nivel = normalizarTexto(fila.Nivel);
      return dptosNorm.includes(dpto) && nivel === 'primaria';
    });

    setFiltradas(resultado);
  }, [departamentos, escuelas]);

  const totalEscuelas = filtradas
    .filter((fila) => normalizarTexto(fila.Entidad) === 'escuelas')
    .reduce((acc, fila) => acc + parseInt(fila.Valor || '0', 10), 0);

  const totalDocentes = filtradas
    .filter((fila) => normalizarTexto(fila.Entidad) === 'docentes')
    .reduce((acc, fila) => acc + parseInt(fila.Valor || '0', 10), 0);

  return {
    escuelasFiltradas: filtradas,
    cantidadEscuelas: totalEscuelas,
    cantidadDocentes: totalDocentes,
    loading,
  };
}
