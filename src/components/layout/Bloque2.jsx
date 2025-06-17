import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { HandCoinsIcon } from 'lucide-react';
import GastosVariablesAccordion from '../ui/GastosVariablesAccordion';
import GastosFijosAccordion from '../ui/GastosFijosAccordion';
import ResumenDeCostos from '../ui/ResumenDeCostos';
import useCostosUnitarios from '@/hooks/useCostosUnitarios';
import ModalAjusteCostos from '../ui/ModalAjusteCostos';
import SimplePieChart from '../ui/SimplePieChart';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';

const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

const Bloque2 = ({
  cantidadDocentes,
  cantidadEscuelas,
  departamentos,
  gastosFijos,
  setGastosFijos,
  gastosVariables,
  setGastosVariables,
  costosExtras,
  setCostosExtras,
  costoTotalGeneral,
  setCostoTotalGeneral,
}) => {
  const { costosAjustados } = useCostosAjustados();
  const { costosUnitarios, loading } = useCostosUnitarios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pieChartsRef = useRef();

  // 🧮 Total por categoría - Fijos
  const totalPorCategoriaFijos = useMemo(() => {
    return gastosFijos.map((grupo) => {
      const totalGrupo = grupo.subitems.reduce((acc, subitem) => {
        const normalized = normalizeName(subitem.name);
        const costoUnitario = costosAjustados[normalized] ?? costosUnitarios[normalized] ?? 0;
        return acc + subitem.cantidad * costoUnitario;
      }, 0);
      return { name: grupo.item, value: totalGrupo };
    });
  }, [gastosFijos, costosUnitarios, costosAjustados]);

  // 🧮 Total por categoría - Variables
  const totalPorCategoriaVariables = useMemo(() => {
    return gastosVariables.map((grupo) => {
      const totalGrupo = grupo.subitems.reduce((acc, subitem) => {
        const normalized = normalizeName(subitem.name);
        const costoUnitario = costosAjustados[normalized] ?? costosUnitarios[normalized] ?? 0;
        return acc + subitem.cantidad * costoUnitario;
      }, 0);
      return { name: grupo.item, value: totalGrupo };
    });
  }, [gastosVariables, costosUnitarios, costosAjustados]);

  // 🧮 Fijos vs Variables
  const fijosVsVariables = useMemo(() => {
    const totalFijos = totalPorCategoriaFijos.reduce((acc, g) => acc + g.value, 0);
    const totalVariables = totalPorCategoriaVariables.reduce((acc, g) => acc + g.value, 0);
    return [
      { name: 'Fijos', value: totalFijos },
      { name: 'Variables', value: totalVariables },
    ];
  }, [totalPorCategoriaFijos, totalPorCategoriaVariables]);

  // 🛠️ Manejo de Costos Extras
  const handleAgregarCostoExtra = () => {
    setCostosExtras((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        nombre: '',
        cantidad: 0,
        costoUnitario: 0,
      },
    ]);
  };

  const handleCambioNombreExtra = (id, newNombre) => {
    setCostosExtras((prev) =>
      prev.map((extra) => (extra.id === id ? { ...extra, nombre: newNombre } : extra))
    );
  };

  const handleCambioCantidadExtra = (id, newCantidad) => {
    setCostosExtras((prev) =>
      prev.map((extra) =>
        extra.id === id ? { ...extra, cantidad: parseInt(newCantidad) || 0 } : extra
      )
    );
  };

  const handleCambioCostoUnitarioExtra = (id, newCosto) => {
    setCostosExtras((prev) =>
      prev.map((extra) =>
        extra.id === id ? { ...extra, costoUnitario: parseFloat(newCosto) || 0 } : extra
      )
    );
  };

  return (
    <section className="flex justify-center mb-10">
      <Card className="w-7/8 text-center my-4 h-full overflow-y-auto">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex justify-start items-center gap-1 p-2 rounded-md">
              <HandCoinsIcon />
              Bloque 2: Costos
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="h-280">
          <div className="grid grid-cols-3 gap-8 p-4 text-start">
            {/* Columna 1: Gastos Fijos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gastos Fijos (cantidades)</h2>
              <GastosFijosAccordion gastosFijos={gastosFijos} setGastosFijos={setGastosFijos} />
            </div>

            {/* Columna 2: Gastos Variables */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gastos Variables (cantidades)</h2>
              <GastosVariablesAccordion
                gastosVariables={gastosVariables}
                setGastosVariables={setGastosVariables}
              />
            </div>

            {/* Columna 3: Resumen */}
            <div>
              <ResumenDeCostos
                gastosFijos={gastosFijos}
                gastosVariables={gastosVariables}
                costosExtras={costosExtras}
                costosUnitarios={costosUnitarios}
                cantidadDocentes={cantidadDocentes}
                cantidadEscuelas={cantidadEscuelas}
                costoTotalGeneral={costoTotalGeneral}
                setCostoTotalGeneral={setCostoTotalGeneral}
              />
              <div className="mt-6">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full rounded-md bg-gradient-to-r from-blue-500 to-blue-300 text-white py-2 font-semibold shadow"
                >
                  AJUSTAR COSTOS UNITARIOS
                </button>
              </div>
              <ModalAjusteCostos open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>

          {/* 🎯 PieCharts */}
          <div ref={pieChartsRef} className="flex justify-center gap-4 mt-10">
            <SimplePieChart data={totalPorCategoriaFijos} title="Distribución Gastos Fijos" />
            <SimplePieChart
              data={totalPorCategoriaVariables}
              title="Distribución Gastos Variables"
            />
            <SimplePieChart data={fijosVsVariables} title="Distribución Fijos vs Variables" />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Bloque2;
