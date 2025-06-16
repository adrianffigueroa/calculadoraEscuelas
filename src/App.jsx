import { useState, useRef } from 'react';
import Bloque1 from './components/layout/Bloque1';
import Bloque2 from './components/layout/Bloque2';
import Bloque3 from './components/layout/Bloque3';
import Bloque4 from './components/layout/Bloque4';
import NavBar from './components/NavBar';
import ModalBienvenida from './components/ModalBienvenida';
import useEscuelasFiltradas from '@/hooks/useEscuelasFiltradas';
import { initialGastosFijos, initialGastosVariables } from '@/data/initialGastos';
import useCostosUnitarios from '@/hooks/useCostosUnitarios';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image-more';

function App() {
  const bloque1Ref = useRef();
  const bloque2Ref = useRef();
  const bloque3Ref = useRef();
  const bloque4Ref = useRef();
  const barChartRef = useRef();
  const pieChartRef = useRef();
  const pagina1Ref = useRef();
  const pagina2Ref = useRef();

  const { costosUnitarios } = useCostosUnitarios();
  const [provincia, setProvincia] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [presupuestoProvincial, setPresupuestoProvincial] = useState(0);
  const [presupuestoNacional, setPresupuestoNacional] = useState(0);
  const [presupuestoInternacional, setPresupuestoInternacional] = useState(0);
  const [gastosFijos, setGastosFijos] = useState(initialGastosFijos);
  const [gastosVariables, setGastosVariables] = useState(initialGastosVariables);
  const [costosExtras, setCostosExtras] = useState([]);

  const { cantidadDocentes, cantidadEscuelas } = useEscuelasFiltradas(departamentos);

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

  const handleGeneratePDF = async () => {
    document.body.classList.add('modo-exportacion');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    try {
      const refs = [pagina1Ref, pagina2Ref];

      for (let i = 0; i < refs.length; i++) {
        const el = refs[i]?.current;
        if (!el) throw new Error(`No se encontró el contenedor de la página ${i + 1}`);

        const dataUrl = await domtoimage.toPng(el, {
          style: { backgroundColor: '#ffffff' },
        });

        const img = new Image();
        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            const imgWidth = pageWidth;
            const imgHeight = (img.height * imgWidth) / img.width;

            const y = 0; // ¡sin centrado vertical!

            if (i > 0) pdf.addPage();
            pdf.addImage(img, 'PNG', 0, y, imgWidth, imgHeight);
            resolve();
          };
        });
      }

      pdf.save('informe_completo.pdf');
    } catch (error) {
      console.error('Error generando el PDF:', error);
    } finally {
      document.body.classList.remove('modo-exportacion');
    }
  };

  return (
    <>
      <NavBar />
      <div ref={pagina1Ref}>
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
      </div>
      <div ref={pagina2Ref}>
        <div ref={bloque3Ref}>
          <Bloque3
            presupuestoProvincial={presupuestoProvincial}
            setPresupuestoProvincial={setPresupuestoProvincial}
            presupuestoNacional={presupuestoNacional}
            setPresupuestoNacional={setPresupuestoNacional}
            presupuestoInternacional={presupuestoInternacional}
            setPresupuestoInternacional={setPresupuestoInternacional}
            barChartRef={barChartRef}
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
            pieChartRef={pieChartRef}
          />
        </div>
      </div>
      <ModalBienvenida />
      <div className="flex justify-center my-6">
        <button
          onClick={handleGeneratePDF}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Generar PDF completo
        </button>
      </div>
    </>
  );
}

export default App;
