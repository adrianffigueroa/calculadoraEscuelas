import React, { useMemo } from 'react';
import { Card } from './card';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';
import useCostosUnitarios from '@/hooks/useCostosUnitarios';

const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

const ResumenDeCostos = ({
  gastosFijos,
  gastosVariables,
  costosExtras = [],
  costosUnitarios,
  cantidadDocentes,
  cantidadEscuelas,
}) => {
  const { costosAjustados } = useCostosAjustados();

  // 🧮 Total Fijos
  const totalFijos = useMemo(() => {
    return gastosFijos.reduce((accGrupo, grupo) => {
      const totalGrupo = grupo.subitems.reduce((acc, subitem) => {
        const normalized = normalizeName(subitem.name);
        const costoUnitario = costosAjustados[normalized] ?? costosUnitarios[normalized] ?? 0;
        return acc + subitem.cantidad * costoUnitario;
      }, 0);
      return accGrupo + totalGrupo;
    }, 0);
  }, [gastosFijos, costosUnitarios, costosAjustados]);

  // 🧮 Total Variables
  const totalVariables = useMemo(() => {
    return gastosVariables.reduce((accGrupo, grupo) => {
      const totalGrupo = grupo.subitems.reduce((acc, subitem) => {
        const normalized = normalizeName(subitem.name);
        const costoUnitario = costosAjustados[normalized] ?? costosUnitarios[normalized] ?? 0;
        return acc + subitem.cantidad * costoUnitario;
      }, 0);
      return accGrupo + totalGrupo;
    }, 0);
  }, [gastosVariables, costosUnitarios, costosAjustados]);

  // 🧮 Total Extras
  const totalExtras = useMemo(() => {
    return costosExtras.reduce((acc, extra) => {
      return acc + extra.cantidad * extra.costoUnitario;
    }, 0);
  }, [costosExtras]);

  // 🧮 Costo Total General
  const costoTotalGeneral = totalFijos + totalVariables + totalExtras;

  return (
    <Card className="p-4 text-left">
      <h2 className="text-xl font-semibold mb-4">Resumen de Costos</h2>
      <p>
        Total Fijos: <strong>${totalFijos.toFixed(2)}</strong>
      </p>
      <p>
        Total Variables: <strong>${totalVariables.toFixed(2)}</strong>
      </p>

      <hr className="my-2" />
      <p>
        <strong>Total General: ${costoTotalGeneral.toFixed(2)}</strong>
      </p>
      <p>
        Costo / Docente:{' '}
        <strong>
          ${cantidadDocentes > 0 ? (costoTotalGeneral / cantidadDocentes).toFixed(2) : '0'}
        </strong>
      </p>
      <p>
        Costo / Escuela:{' '}
        <strong>
          ${cantidadEscuelas > 0 ? (costoTotalGeneral / cantidadEscuelas).toFixed(2) : '0'}
        </strong>
      </p>
    </Card>
  );
};

export default ResumenDeCostos;
