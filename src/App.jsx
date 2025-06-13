import { useState, useEffect } from 'react';
import Bloque1 from './components/layout/Bloque1';
import Bloque2 from './components/layout/Bloque2';
import Bloque3 from './components/layout/Bloque3';
import Bloque4 from './components/layout/Bloque4';
import NavBar from './components/NavBar';
import useEscuelasFiltradas from '@/hooks/useEscuelasFiltradas';
import { initialGastosFijos, initialGastosVariables } from '@/data/initialGastos';
import useCostosUnitarios from '@/hooks/useCostosUnitarios';
import { useRef } from 'react';

function App() {
  const bloque1Ref = useRef();
  const bloque2Ref = useRef();
  const bloque3Ref = useRef();
  const bloque4Ref = useRef();
  const { costosUnitarios } = useCostosUnitarios();
  const [provincia, setProvincia] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [presupuestoProvincial, setPresupuestoProvincial] = useState(0);
  const [presupuestoNacional, setPresupuestoNacional] = useState(0);
  const [presupuestoInternacional, setPresupuestoInternacional] = useState(0);
  const [gastosFijos, setGastosFijos] = useState(initialGastosFijos);
  const [gastosVariables, setGastosVariables] = useState(initialGastosVariables);
  const [costosExtras, setCostosExtras] = useState([]);

  const { escuelasFiltradas, cantidadEscuelas, cantidadDocentes, loading } =
    useEscuelasFiltradas(departamentos);
  // calcular el total de costos
  const calcularTotalCostos = () => {
    const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

    const sumGrupo = (grupo) =>
      grupo.reduce((acc, item) => {
        const subitemsTotal = item.subitems.reduce((sum, s) => {
          const normalizedName = normalizeName(s.name);
          const costoUnitario = costosUnitarios[normalizedName] || 0;
          return sum + s.cantidad * costoUnitario;
        }, 0);

        const extrasTotal = item.extras.reduce(
          (sum, s) => sum + s.cantidad * (s.costoUnitario || 0),
          0
        );

        return acc + subitemsTotal + extrasTotal;
      }, 0);

    const fijosTotal = sumGrupo(gastosFijos);
    const variablesTotal = sumGrupo(gastosVariables);

    const extrasTotal = costosExtras.reduce(
      (acc, item) => acc + item.cantidad * item.costoUnitario,
      0
    );

    return fijosTotal + variablesTotal + extrasTotal;
  };

  const totalCostos = calcularTotalCostos();
  const totalPresupuesto = presupuestoProvincial + presupuestoNacional + presupuestoInternacional;

  return (
    <>
      <NavBar />
      <div ref={bloque1Ref}>
        <Bloque1
          provincia={provincia}
          setProvincia={setProvincia}
          departamentos={departamentos}
          setDepartamentos={setDepartamentos}
        />
      </div>
      <div ref={bloque2Ref}>
        <Bloque2
          cantidadDocentes={cantidadDocentes}
          cantidadEscuelas={cantidadEscuelas}
          departamentos={departamentos}
          gastosFijos={gastosFijos}
          setGastosFijos={setGastosFijos}
          gastosVariables={gastosVariables}
          setGastosVariables={setGastosVariables}
          costosExtras={costosExtras}
          setCostosExtras={setCostosExtras}
        />
      </div>
      <div ref={bloque3Ref}>
        <Bloque3
          presupuestoProvincial={presupuestoProvincial}
          setPresupuestoProvincial={setPresupuestoProvincial}
          presupuestoNacional={presupuestoNacional}
          setPresupuestoNacional={setPresupuestoNacional}
          presupuestoInternacional={presupuestoInternacional}
          setPresupuestoInternacional={setPresupuestoInternacional}
        />
      </div>
      <div ref={bloque4Ref}>
        <Bloque4
          provincia={provincia}
          departamentos={departamentos}
          cantidadEscuelas={cantidadEscuelas}
          cantidadDocentes={cantidadDocentes}
          presupuestoTotal={totalPresupuesto}
          costoTotal={totalCostos}
          exportRefs={[bloque1Ref, bloque2Ref, bloque3Ref, bloque4Ref]}
        />
      </div>
    </>
  );
}

export default App;
