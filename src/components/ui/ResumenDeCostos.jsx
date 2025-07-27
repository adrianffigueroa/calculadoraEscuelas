import React, { useEffect, useMemo } from 'react';
import { Card } from './card';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';
import { formatNumber } from '@/utils/formatNumber';

const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

const ResumenDeCostos = ({
  gastosFijos,
  gastosVariables,
  costosExtras = [],
  costosUnitarios,
  cantidadDocentes,
  cantidadEscuelas,
  costoTotalGeneral,
  setCostoTotalGeneral,
  diasObjetivo,
  docentesObjetivo,
  docentesRurales,
}) => {
  const { costosAjustados } = useCostosAjustados();

  // 🧮 Total Fijos
  const totalFijos = useMemo(() => {
    return gastosFijos?.reduce((accGrupo, grupo) => {
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
        const nombre = subitem.name.toLowerCase();
        const normalized = normalizeName(subitem.name);
        const costoUnitario = costosAjustados[normalized] ?? costosUnitarios[normalized] ?? 0;

        let totalItem = 0;

        if (nombre.includes('transporte')) {
          totalItem = costoUnitario * diasObjetivo * (docentesObjetivo - docentesRurales) * 2;
        } else if (nombre.includes('combustible')) {
          totalItem = costoUnitario * diasObjetivo * docentesRurales;
        } else if (nombre.includes('bebida') || nombre.includes('comida')) {
          totalItem = subitem.cantidad * costoUnitario * diasObjetivo * docentesObjetivo;
        } else {
          totalItem = subitem.cantidad * costoUnitario * docentesObjetivo;
        }

        return acc + totalItem;
      }, 0);

      return accGrupo + totalGrupo;
    }, 0);
  }, [
    gastosVariables,
    costosUnitarios,
    costosAjustados,
    diasObjetivo,
    docentesObjetivo,
    docentesRurales,
  ]);

  // 🧮 Total Extras
  const totalExtras = useMemo(() => {
    return costosExtras.reduce((acc, extra) => {
      return acc + extra.cantidad * extra.costoUnitario;
    }, 0);
  }, [costosExtras]);

  // 🧮 Costo Total General
  useEffect(() => {
    setCostoTotalGeneral(totalFijos + totalVariables + totalExtras);
  }),
    [totalFijos, totalVariables, totalExtras];

  return (
    <Card className="p-4 text-left">
      <h2 className="text-xl font-semibold mb-4">Resumen de Costos</h2>
      <p>
        Total Fijos: <strong>${formatNumber(totalFijos)}</strong>
      </p>
      <p>
        Total Variables: <strong>${totalVariables ? formatNumber(totalVariables) : '0'}</strong>
      </p>

      <hr className="my-2" />
      <p>
        <strong>Total General: ${costoTotalGeneral ? formatNumber(costoTotalGeneral) : '0'}</strong>
      </p>
      <p>
        Costo / Docente:{' '}
        <strong>
          $
          {cantidadDocentes > 0 && costoTotalGeneral > 0
            ? formatNumber(costoTotalGeneral / cantidadDocentes)
            : '0'}
        </strong>
      </p>
      <p>
        Costo / Escuela:{' '}
        <strong>
          $
          {cantidadEscuelas > 0 && costoTotalGeneral > 0
            ? formatNumber(costoTotalGeneral / cantidadEscuelas)
            : '0'}
        </strong>
      </p>
    </Card>
  );
};

export default ResumenDeCostos;
