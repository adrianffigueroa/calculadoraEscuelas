import { useState } from 'react';
import { WalletMinimalIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { GradientButton } from '../ui/GradientButton';
import ModalAgregarFinanciamiento from '../ui/ModalAgregarFianciamiento';
import { Button } from '../ui/button';
import { parse } from 'papaparse';

const Bloque3 = ({
  presupuestoProvincial,
  setPresupuestoProvincial,
  presupuestoNacional,
  setPresupuestoNacional,
  presupuestoInternacional,
  setPresupuestoInternacional,
  costoTotalGeneral,
  barChartRef,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hideFinanciamiento, setHideFinanciamiento] = useState(true);
  const [financiamientoExtra, setFinanciamientoExtra] = useState([]);
  const total =
    presupuestoProvincial +
    presupuestoNacional +
    presupuestoInternacional +
    parseFloat(
      financiamientoExtra?.reduce((acc, item) => parseFloat(acc) + parseFloat(item.monto), 0)
    );
  const data = [
    {
      origen: 'Presupuesto',
      Provincial: presupuestoProvincial,
      Nacional: presupuestoNacional,
      Internacional: presupuestoInternacional,
      Extra: parseFloat(
        financiamientoExtra.reduce((acc, item) => parseFloat(acc) + parseFloat(item.monto), 0)
      ),
    },
  ];
  const colors = {
    Provincial: '#60A5FA',
    Nacional: '#FDE68A',
    Internacional: '#FDA4AF',
    Extra: '#a3de6d',
  };

  const handleFocus = (e) => {
    if (e.target.value === '0') e.target.value = '';
  };

  const handleBlur = (setter, value) => (e) => {
    const val = e.target.value.trim();
    setter(val === '' ? 0 : Number(val));
  };

  const handleDelete = (id) => {
    setFinanciamientoExtra(financiamientoExtra.filter((item) => item.id !== id));
  };

  return (
    <section className="flex justify-center mb-10">
      <Card className="w-13/14 text-center my-4 h-auto">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex justify-start items-center gap-1 p-2 rounded-md">
              <span>
                <WalletMinimalIcon />
              </span>{' '}
              Bloque 3: Presupuesto Disponible
            </div>
          </CardTitle>
          <div className="w-5/6 grid grid-cols-[1fr_1fr_2fr] gap-6 p-6">
            {/* Columna 1: Inputs */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Presupuesto Provincial</h2>
              <input
                type="number"
                value={presupuestoProvincial}
                onChange={(e) => setPresupuestoProvincial(Number(e.target.value))}
                onFocus={handleFocus}
                onBlur={handleBlur(setPresupuestoProvincial, presupuestoProvincial)}
                className="w-full rounded-md border p-2 appearance-none"
              />

              <h2 className="text-xl font-semibold">Presupuesto Nacional</h2>
              <input
                type="number"
                value={presupuestoNacional}
                onChange={(e) => setPresupuestoNacional(Number(e.target.value))}
                onFocus={handleFocus}
                onBlur={handleBlur(setPresupuestoNacional, presupuestoNacional)}
                className="w-full rounded-md border p-2 appearance-none"
              />

              <h2 className="text-xl font-semibold">Presupuesto Internacional</h2>
              <input
                type="number"
                value={presupuestoInternacional}
                onChange={(e) => setPresupuestoInternacional(Number(e.target.value))}
                onFocus={handleFocus}
                onBlur={handleBlur(setPresupuestoInternacional, presupuestoInternacional)}
                className="w-full rounded-md border p-2 appearance-none"
              />
              {financiamientoExtra.length > 0 && (
                <>
                  <h2 className="text-xl font-semibold">Presupuesto Extra</h2>
                  {financiamientoExtra.map((financiamiento, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center border p-2 rounded-md"
                    >
                      <div className="flex flex-col items-start">
                        <p>
                          <span className="font-semibold"> Nombre:</span> {financiamiento.nombre}
                        </p>
                        <p>
                          {' '}
                          <span className="font-semibold"> Monto: $</span> {financiamiento.monto}
                        </p>
                      </div>
                      <div>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(financiamiento.id)}
                          className="cursor-pointer"
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              <GradientButton onClick={() => setIsModalOpen(true)}>
                + Agregar Financiamiento
              </GradientButton>
            </div>

            {/* Columna 2: Resumen */}
            <div className="text-start">
              <h2 className="text-xl font-semibold mb-4">Resumen de Presupuesto</h2>
              <p>
                Provincial: ${presupuestoProvincial} (
                {total > 0 ? ((presupuestoProvincial / total) * 100).toFixed(0) + '%' : '0%'})
              </p>
              <p>
                Nacional: ${presupuestoNacional} (
                {total > 0 ? ((presupuestoNacional / total) * 100).toFixed(0) + '%' : '0%'})
              </p>
              <p>
                Internacional: ${presupuestoInternacional} (
                {total > 0 ? ((presupuestoInternacional / total) * 100).toFixed(0) + '%' : '0%'})
              </p>
              <p>
                {financiamientoExtra.length > 0 && (
                  <>
                    <span>
                      Extra: $
                      {parseFloat(
                        financiamientoExtra.reduce(
                          (total, item) => parseFloat(total) + parseFloat(item.monto),
                          0
                        )
                      )}
                    </span>{' '}
                    (
                    {total > 0
                      ? (
                          (parseFloat(
                            financiamientoExtra.reduce(
                              (total, item) => parseFloat(total) + parseFloat(item.monto),
                              0
                            )
                          ) /
                            total) *
                          100
                        ).toFixed(0) + '%'
                      : '0%'}
                    )
                  </>
                )}
              </p>

              <hr className="my-2" />
              <p>Costo Total: ${costoTotalGeneral.toFixed(0)}</p>
              <p>Presupuesto Total: ${total}</p>
              <p>Balance: ${total - costoTotalGeneral}</p>
            </div>

            {/* Columna 3: Gráfico */}
            <div className="h-[350px]">
              <div className="bg-blue-200 rounded-md text-center py-1 font-semibold mb-2">
                Presupuesto según origen
              </div>
              <div ref={barChartRef} style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="origen" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Provincial" stackId="a" fill={colors.Provincial} />
                    <Bar dataKey="Nacional" stackId="a" fill={colors.Nacional} />
                    <Bar dataKey="Internacional" stackId="a" fill={colors.Internacional} />
                    <Bar dataKey="Extra" stackId="a" fill={colors.Extra} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
      <ModalAgregarFinanciamiento
        hideFinanciamiento={hideFinanciamiento}
        setHideFinanciamiento={setHideFinanciamiento}
        financiamientoExtra={financiamientoExtra}
        setFinanciamientoExtra={setFinanciamientoExtra}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default Bloque3;
