import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { WalletMinimalIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
const Bloque3 = ({
  presupuestoProvincial,
  setPresupuestoProvincial,
  presupuestoNacional,
  setPresupuestoNacional,
  presupuestoInternacional,
  setPresupuestoInternacional,
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
  return (
    <section className="flex justify-center">
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
                className="w-full rounded-md border p-2"
              />

              <h2 className="text-xl font-semibold">Presupuesto Nacional</h2>
              <input
                type="number"
                value={presupuestoNacional}
                onChange={(e) => setPresupuestoNacional(Number(e.target.value))}
                className="w-full rounded-md border p-2"
              />

              <h2 className="text-xl font-semibold">Presupuesto Internacional</h2>
              <input
                type="number"
                value={presupuestoInternacional}
                onChange={(e) => setPresupuestoInternacional(Number(e.target.value))}
                className="w-full rounded-md border p-2"
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
              <p>Costo Total: $0</p>
              <p>Presupuesto Total: ${total}</p>
              <p>Balance: ${total}</p>
            </div>

            {/* Columna 3: Gráfico */}
            <div className="h-[350px]">
              <div className="bg-blue-200 rounded-md text-center py-1 font-semibold mb-2">
                Presupuesto según origen
              </div>
              <ResponsiveBar
                data={data}
                keys={['Provincial', 'Nacional', 'Internacional']}
                indexBy="origen"
                margin={{ top: 10, right: 30, bottom: 50, left: 50 }}
                padding={0.5}
                layout="vertical"
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id }) => colors[id]}
                borderRadius={2}
                enableLabel={true}
                labelSkipHeight={12}
                labelTextColor="#000"
                axisBottom={{
                  tickSize: 5,
                  tickPadding: 5,
                  legendPosition: 'middle',
                  legendOffset: 32,
                }}
                axisLeft={null}
                legends={[
                  {
                    dataFrom: 'keys',
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateY: 50,
                    itemsSpacing: 8,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#000',
                    symbolSize: 15,
                    symbolShape: 'circle',
                  },
                ]}
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </section>
  );
};

export default Bloque3;
