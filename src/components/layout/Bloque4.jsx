import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  FileText,
  MapPin,
  Building2,
  School,
  UsersRound,
  CreditCard,
  DollarSign,
  Download,
} from 'lucide-react';
import { formatNumber } from '@/utils/formatNumber';

const Bloque4 = ({
  provincia,
  departamentos,
  cantidadEscuelas,
  cantidadDocentes,
  presupuestoTotal,
  costoTotal,
}) => {
  return (
    <section className="flex justify-center">
      <Card className="w-13/14 text-start my-4">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex items-center gap-2 p-2 rounded-md">
              <FileText />
              Bloque 4: Ficha Síntesis
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div id="bloque4-pdf" className="p-4 border rounded-md shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ficha Síntesis del Programa</h2>
            <p className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-gray-500" />
              Provincia: <span className="font-medium">{provincia || '-'}</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-gray-500" />
              Departamento: <span className="font-medium">{departamentos?.join(', ') || '-'}</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <School className="w-4 h-4 text-gray-500" />
              Unidades Educativas: <span className="font-medium">{cantidadEscuelas}</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <UsersRound className="w-4 h-4 text-gray-500" />
              Docentes: <span className="font-medium">{cantidadDocentes}</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <CreditCard className="w-4 h-4 text-gray-500" />
              Presupuesto Total:{' '}
              <span className="font-medium">${presupuestoTotal.toLocaleString()}</span>
            </p>
            <p className="flex items-center gap-2 mb-1">
              <DollarSign className="w-4 h-4 text-gray-500" />
              Costo Total: <span className="font-medium">${costoTotal.toLocaleString()}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Bloque4;
