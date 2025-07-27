// import { useEffect, useState } from 'react';

// // URL de tu API

// // Función para normalizar nombres → le saca "(número)" y espacios extra
// const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

// export default function useCostosUnitarios(provincia) {
//   const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/1MZKh6eCNdifvuwU7T9KitTvMoUkV5vnvE5_rziGLQ2M/values/${encodeURIComponent(
//     provincia
//   )}!C2:F100?key=AIzaSyBHgQ8ODWhZty3nguefQtUtozRPiQFMmwQ`;

//   const [costosUnitarios, setCostosUnitarios] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch(API_URL)
//       .then((response) => response.json())
//       .then((data) => {
//         const rows = data.values || [];
//         const costosMap = {};

//         rows.forEach((row, index) => {
//           const name = row[0]; // Columna C → Desagregación componentes
//           const costoUnitarioRaw = row[3]; // Columna F → Costo unitario

//           if (name) {
//             let costo = 0;

//             if (costoUnitarioRaw !== undefined && costoUnitarioRaw !== '') {
//               costo =
//                 parseFloat(
//                   costoUnitarioRaw
//                     .toString()
//                     .replace(/[$\s]/g, '') // elimina $ y espacios
//                     .replace(/,/g, '') // reemplaza comas por puntos
//                 ) || 0;
//             }

//             const normalizedName = normalizeName(name);

//             costosMap[normalizedName] = costo;
//           }
//         });
//         setCostosUnitarios(costosMap);
//         setLoading(false);
//         console.log(API_URL);
//       })
//       .catch((error) => {
//         console.error('Error al obtener costos unitarios:', error);
//         setError(error);
//         setLoading(false);
//       });
//   }, [provincia, API_URL]);

//   return { costosUnitarios, loading, error };
// }

// utils/fetchCostosUnitarios.js

// Función para normalizar nombres → le saca "(número)" y espacios extra
const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

export async function fetchCostosUnitarios(provincia) {
  if (!provincia || provincia === 'null' || provincia === 'undefined') {
    console.warn('fetchCostosUnitarios: provincia inválida:', provincia);
    return { costosUnitarios: {} };
  }
  const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/1MZKh6eCNdifvuwU7T9KitTvMoUkV5vnvE5_rziGLQ2M/values/${encodeURIComponent(
    provincia
  )}!C2:F100?key=AIzaSyBHgQ8ODWhZty3nguefQtUtozRPiQFMmwQ`;

  try {
    console.log(provincia);

    const response = await fetch(API_URL);
    const data = await response.json();
    const rows = data.values || [];
    const costosMap = {};

    rows.forEach((row) => {
      const name = row[0]; // Columna C
      const costoUnitarioRaw = row[3]; // Columna F

      if (name) {
        let costo = 0;

        if (costoUnitarioRaw !== undefined && costoUnitarioRaw !== '') {
          costo =
            parseFloat(
              costoUnitarioRaw
                .toString()
                .replace(/[$\s]/g, '') // elimina $ y espacios
                .replace(/,/g, '') // elimina comas
            ) || 0;
        }

        const normalizedName = normalizeName(name);
        costosMap[normalizedName] = costo;
      }
    });

    return { costosUnitarios: costosMap, error: null };
  } catch (error) {
    console.error('Error al obtener costos unitarios:', error);
    return { costosUnitarios: {}, error };
  }
}
