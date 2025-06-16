import { useEffect, useState } from 'react';

// URL de tu API
const API_URL =
  'https://sheets.googleapis.com/v4/spreadsheets/1MZKh6eCNdifvuwU7T9KitTvMoUkV5vnvE5_rziGLQ2M/values/Hoja%201!C2:F100?key=AIzaSyBHgQ8ODWhZty3nguefQtUtozRPiQFMmwQ';

// Función para normalizar nombres → le saca "(número)" y espacios extra
const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

export default function useCostosUnitarios() {
  const [costosUnitarios, setCostosUnitarios] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const rows = data.values || [];
        const costosMap = {};

        rows.forEach((row, index) => {
          const name = row[0]; // Columna C → Desagregación componentes
          const costoUnitarioRaw = row[3]; // Columna F → Costo unitario

          if (name) {
            let costo = 0;

            if (costoUnitarioRaw !== undefined && costoUnitarioRaw !== '') {
              costo =
                parseFloat(
                  costoUnitarioRaw
                    .toString()
                    .replace(/[$\s]/g, '') // elimina $ y espacios
                    .replace(',', '.')
                ) || 0;
            }

            const normalizedName = normalizeName(name);

            costosMap[normalizedName] = costo;
          }
        });
        // 🧪 Log de claves relevantes (opcional)
        Object.keys(costosMap).forEach((key) => {
          if (key.includes('cuadernillos')) {
            console.log('🔍 Costo registrado para:', `"${key}" → $${costosMap[key]}"`);
          }
        });
        setCostosUnitarios(costosMap);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener costos unitarios:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { costosUnitarios, loading, error };
}
