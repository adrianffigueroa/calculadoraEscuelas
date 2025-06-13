import Papa from 'papaparse';
import { useEffect, useState } from 'react';

const URL_CSV =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vTLwZIAm5kAnoSmCAXT4QqgPG8aCTqMYvqYe5BCMrzzNvmElFRpeN_hJH1S648OBeDE5wcL1AE0uHke/pub?output=csv';

export default function useCostosPorProvincia(nombreProvincia = 'Salta') {
  const [valores, setValores] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(URL_CSV, {
      download: true,
      header: true,
      complete: (result) => {
        const fila = result.data.find((row) =>
          row.Jurisdiccion?.toLowerCase().includes(nombreProvincia.toLowerCase())
        );

        setValores({
          Administrativos: fila?.Administrativos || '',
          Psicopedagogos: fila?.Psicopedagogos || '',
          Especialistas: fila?.Especialistas || '',
          Traduccion: fila?.Traduccion || '',
          Impresion: fila?.Impresion || '',
          Transporte: fila?.Transporte || '',
          Adicional: fila?.Adicional || '',
        });

        setLoading(false);
      },
    });
  }, [nombreProvincia]);

  return { valores, setValores, loading };
}
