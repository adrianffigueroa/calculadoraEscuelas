import React from 'react';
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
  const total = presupuestoProvincial + presupuestoNacional + presupuestoInternacional;
  const data = [
    {
      origen: 'Presupuesto',
      Provincial: presupuestoProvincial,
      Nacional: presupuestoNacional,
      Internacional: presupuestoInternacional,
    },
  ];
  const colors = { Provincial: '#60A5FA', Nacional: '#FDE68A', Internacional: '#FDA4AF' };

  const handleFocus = (e) => {
    if (e.target.value === '0') e.target.value = '';
  };

  const handleBlur = (setter, value) => (e) => {
    const val = e.target.value.trim();
    setter(val === '' ? 0 : Number(val));
  };

  return (
    <section className="flex justify-center mb-10">
      <Card className="w-7/8 text-center my-4 h-130">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex justify-start items-center gap-1 p-2 rounded-md">
              <span>
                <WalletMinimalIcon />
              </span>{' '}
              Bloque 3: Presupuesto Disponible
            </div>
          </CardTitle>
          <div className="w-5/6 grid grid-cols-3 gap-6 p-6">
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
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default Bloque3;
