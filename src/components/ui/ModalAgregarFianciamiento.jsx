// components/ui/ModalAgregarCostoExtra.jsx
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { GradientButton } from './GradientButton';
import { Input } from '@/components/ui/input';

const ModalAgregarFinanciamiento = ({
  open,
  onClose,
  hideFinanciamiento,
  setHideFinanciamiento,
  financiamientoExtra,
  setFinanciamientoExtra,
}) => {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState(0);

  // Si estamos editando → cargamos los datos

  const handleSave = () => {
    if (nombre.trim() === '') return;
    // onSave({
    //   id: initialData?.id || Math.random().toString(36).substr(2, 9),
    //   nombre: nombre,
    //   monto: parseInt(monto, 10) || 0,
    //   tipo: tipo || '',
    // });
    setFinanciamientoExtra((prev) => [
      ...prev,
      { nombre: nombre, monto: monto, id: Math.random().toString(36).substr(2, 9) },
    ]);
    setHideFinanciamiento(!hideFinanciamiento);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="[&>button:last-of-type]:hidden">
        <DialogHeader>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <DialogTitle>'Agregar Financiamiento Extra'</DialogTitle>
              <DialogDescription>
                Complete los campos para el financiamiento extra.
              </DialogDescription>
            </div>
            <div>
              <DialogClose asChild>
                <GradientButton onClick={() => onClose()}>X</GradientButton>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nombre del financiamiento extra"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="number"
            min="0"
            placeholder="Monto"
            value={monto || ''}
            onChange={(e) => setMonto(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <GradientButton onClick={onClose}>Cancelar</GradientButton>
            <GradientButton onClick={handleSave}>Guardar</GradientButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAgregarFinanciamiento;
