import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';

const ModalBienvenida = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Siempre se abre al montar el componente
    setOpen(true);
  }, []);

  const handleCerrar = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-xl text-gray-800">
        <div className="flex items-center space-x-2">
          <Info className="text-blue-600" />
          <h2 className="text-lg font-semibold">¡Bienvenido/a!</h2>
        </div>

        <div className="space-y-4 mt-2">
          <p>
            Te presentamos la{' '}
            <strong>calculadora de Costos de Programas de Formación Docente</strong>. La calculadora
            está diseñada para apoyar las propuestas de formación a partir de la estimación de
            costos. Los datos se ajustan según{' '}
            <em>
              la provincia, los departamentos, y el volúmen de las escuelas y docentes que esperas
              alcanzar
            </em>
            .
          </p>
          <p>
            De forma predefinida te brinda opciones de costos por provincia, y también te permite
            ajustarlos manualmente de acuerdo a tus estimaciones. El proceso se organiza en bloques
            ordenados por componentes de costeo.
          </p>
          <p className="text-sm text-muted-foreground">
            Explorá las opciones, ajustá los costos, definí los recursos y luego exportá en PDF o
            CSV.
            <br />
            ¡Esperamos que esta herramienta sea una ayuda para la planificación de políticas!
          </p>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={handleCerrar} className="bg-blue-500 hover:bg-blue-600">
            EMPEZAR
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBienvenida;
