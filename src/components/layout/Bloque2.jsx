import React, { useState, useMemo, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { HandCoinsIcon } from 'lucide-react';
import GastosVariablesAccordion from '../ui/GastosVariablesAccordion';
import GastosFijosAccordion from '../ui/GastosFijosAccordion';
import ResumenDeCostos from '../ui/ResumenDeCostos';
//import useCostosUnitarios from '@/hooks/useCostosUnitarios';
//import { fetchCostosUnitarios } from '@/hooks/useCostosUnitarios';
import ModalAjusteCostos from '../ui/ModalAjusteCostos';
import SimplePieChart from '../ui/SimplePieChart';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';
import { GradientButton } from '../ui/GradientButton';

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
  // setCostosExtras,
  costoTotalGeneral,
  setCostoTotalGeneral,
  diasObjetivo,
  // setDiasObjetivo,
  // escuelasObjetivo,
  // setEscuelasObjetivo,
  docentesObjetivo,
  // setDocentesObjetivo,
  docentesRurales,
  // setDocentesRurales,
  costosUnitarios,
}) => {
  const { costosAjustados } = useCostosAjustados();
  //let costosUnitarios = fetchCostosUnitarios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pieChartsRef = useRef();

  // 🧮 Total por categoría - Fijos
  const totalPorCategoriaFijos = useMemo(() => {
    return gastosFijos?.map((grupo) => {
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
    const totalFijos = totalPorCategoriaFijos?.reduce((acc, g) => acc + g.value, 0);
    const totalVariables = totalPorCategoriaVariables.reduce((acc, g) => acc + g.value, 0);
    return [
      { name: 'Fijos', value: totalFijos },
      { name: 'Variables', value: totalVariables },
    ];
  }, [totalPorCategoriaFijos, totalPorCategoriaVariables]);

  // 🛠️ Manejo de Costos Extras
  // const handleAgregarCostoExtra = () => {
  //   setCostosExtras((prev) => [
  //     ...prev,
  //     {
  //       id: Math.random().toString(36).substr(2, 9),
  //       nombre: '',
  //       cantidad: 0,
  //       costoUnitario: 0,
  //     },
  //   ]);
  // };

  // const handleCambioNombreExtra = (id, newNombre) => {
  //   setCostosExtras((prev) =>
  //     prev.map((extra) => (extra.id === id ? { ...extra, nombre: newNombre } : extra))
  //   );
  // };

  // const handleCambioCantidadExtra = (id, newCantidad) => {
  //   setCostosExtras((prev) =>
  //     prev.map((extra) =>
  //       extra.id === id ? { ...extra, cantidad: parseInt(newCantidad) || 0 } : extra
  //     )
  //   );
  // };

  // const handleCambioCostoUnitarioExtra = (id, newCosto) => {
  //   setCostosExtras((prev) =>
  //     prev.map((extra) =>
  //       extra.id === id ? { ...extra, costoUnitario: parseFloat(newCosto) || 0 } : extra
  //     )
  //   );
  // };

  return (
    <section className="flex justify-center mb-10">
      <Card className="w-13/14 text-center my-4 h-full overflow-y-auto">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex justify-start items-center gap-1 p-2 rounded-md">
              <HandCoinsIcon />
              Bloque 2: Costos
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="h-280">
          <div className="grid grid-cols-[2fr_2fr_1fr] gap-4 p-4 text-start">
            {/* Columna 1: Gastos Fijos */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gastos Fijos (cantidades)</h2>
              <GastosFijosAccordion
                gastosFijos={gastosFijos}
                setGastosFijos={setGastosFijos}
                costosUnitarios={costosUnitarios}
              />
            </div>

            {/* Columna 2: Gastos Variables */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Gastos Variables (cantidades)</h2>
              <GastosVariablesAccordion
                gastosVariables={gastosVariables}
                setGastosVariables={setGastosVariables}
                docentesObjetivo={docentesObjetivo}
                departamentos={departamentos}
                docentesRurales={docentesRurales}
                diasObjetivo={diasObjetivo}
                costosUnitarios={costosUnitarios}
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
                diasObjetivo={diasObjetivo}
                docentesObjetivo={docentesObjetivo}
                docentesRurales={docentesRurales}
              />
              <div className="mt-6">
                <GradientButton onClick={() => setIsModalOpen(true)}>
                  AJUSTAR COSTOS UNITARIOS
                </GradientButton>
              </div>
              <ModalAjusteCostos open={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
          </div>

          {/* 🎯 PieCharts */}
          <div ref={pieChartsRef} className="flex justify-center gap-4 mt-10">
            <SimplePieChart
              data={totalPorCategoriaFijos}
              title="Distribución Gastos Fijos"
              outerRadius={120}
            />
            <SimplePieChart
              data={totalPorCategoriaVariables}
              title="Distribución Gastos Variables"
            />
            <SimplePieChart
              data={fijosVsVariables}
              title="Distribución Fijos vs Variables"
              outerRadius={120}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Bloque2;
