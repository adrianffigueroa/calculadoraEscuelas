import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Info } from 'lucide-react';
import { GradientButton } from './ui/GradientButton';

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
      <DialogContent className="max-w-xl text-gray-800 [&>button:last-of-type]:hidden">
        <div className="flex items-center space-x-2 justify-between">
          <div className="flex items-center space-x-2">
            <Info className="text-red-800" />
            <h2 className="text-lg font-semibold">¡Bienvenido/a!</h2>
          </div>
          <DialogClose asChild>
            <GradientButton onClick={handleCerrar}>X</GradientButton>
          </DialogClose>
        </div>
        <div className="space-y-4 mt-2">
          <p>
            Compartimos de modo abierto el acceso a la{' '}
            <strong>calculadora de Costos de Programas de Formación Docente Continua</strong>. Es
            una herramienta diseñada para apoyar las propuestas de formación a partir de un esquema
            de estimación de costos. <br />
          </p>
          <p>
            Los datos se ajustan según la provincia, los departamentos, y el volúmen de unidades
            educativas y docentes que se esperan alcanzar.
          </p>
          <p>
            De forma predefinida te brinda opciones de costos por provincia, y también te permite
            ajustarlos manualmente de acuerdo a tus estimaciones. El proceso se organiza en bloques
            ordenados por componentes de costeo.
          </p>
          <p className="text-sm">
            ¡Esperamos que esta herramienta sea una ayuda para la planificación de políticas!
          </p>
        </div>

        <DialogFooter className="mt-4">
          <GradientButton onClick={handleCerrar}>EMPEZAR</GradientButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBienvenida;
