// components/ui/ModalAgregarCostoExtra.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ModalAgregarCostoExtra = ({ open, onClose, onSave, initialData }) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [costoUnitario, setCostoUnitario] = useState(0);

  // Si estamos editando → cargamos los datos
  useEffect(() => {
    if (initialData) {
      setNombre(initialData.name);
      setCantidad(initialData.cantidad);
      setCostoUnitario(initialData.costoUnitario);
    } else {
      setNombre('');
      setCantidad(0);
      setCostoUnitario(0);
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (nombre.trim() === '') return;
    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      name: nombre,
      cantidad: parseInt(cantidad, 10) || 0,
      costoUnitario: parseFloat(costoUnitario) || 0,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Costo Extra' : 'Agregar Costo Extra'}</DialogTitle>
          <DialogDescription>Complete los campos para el costo extra.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Nombre del costo extra"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <Input
            type="number"
            min="0"
            placeholder="Cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="Costo unitario"
            value={costoUnitario}
            onChange={(e) => setCostoUnitario(e.target.value)}
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>{initialData ? 'Guardar cambios' : 'Guardar'}</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAgregarCostoExtra;
