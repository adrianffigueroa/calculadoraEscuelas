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
import { useExportPDF } from '@/hooks/useExportPDF';

const Bloque4 = ({
  provincia,
  departamentos,
  cantidadEscuelas,
  cantidadDocentes,
  presupuestoTotal,
  costoTotal,
  exportRefs,
}) => {
  const { exportPDF } = useExportPDF();

  const handleExport = () => {
    exportPDF(exportRefs);
  };

  return (
    <section className="flex justify-center">
      <Card className="w-7/8 text-start my-4">
        <CardHeader>
          <CardTitle>
            <div className="bg-gray-100 text-2xl flex items-center gap-2 p-2 rounded-md">
              <FileText />
              Bloque 4: Ficha Síntesis
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="p-4 border rounded-md shadow-sm">
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
              Escuelas: <span className="font-medium">{cantidadEscuelas}</span>
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

          <div className="flex justify-center mt-6">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500 text-white px-6 py-2 rounded-lg shadow"
            >
              <Download className="w-4 h-4" />
              Generar PDF
            </button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Bloque4;
