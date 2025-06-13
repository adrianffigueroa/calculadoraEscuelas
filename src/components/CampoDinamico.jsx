// components/CampoDinamico.jsx
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function CampoDinamico({ tipo = 'fijo', onChange }) {
  const [campos, setCampos] = useState([]);
  const [label, setLabel] = useState('');
  const [valor, setValor] = useState('');
  const [open, setOpen] = useState(false);

  const agregarCampo = () => {
    if (!label.trim() || !valor.trim()) return;
    const nuevoCampo = { label, value: valor };
    const actualizados = [...campos, nuevoCampo];
    setCampos(actualizados);
    onChange(actualizados);
    setLabel('');
    setValor('');
    setOpen(false);
  };

  const actualizarValor = (i, val) => {
    const nuevos = [...campos];
    nuevos[i].value = val;
    setCampos(nuevos);
    onChange(nuevos);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        Campos {tipo === 'fijo' ? 'Fijos' : 'Variables'} adicionales
      </h3>

      {campos.map((campo, i) => (
        <div key={i}>
          <label className="block mb-1">{campo.label}</label>
          <input
            type="number"
            value={campo.value}
            onChange={(e) => actualizarValor(i, e.target.value)}
            className="w-full rounded-md border p-2"
          />
        </div>
      ))}

      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">+ Agregar Campo</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Agregar nuevo campo</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                placeholder="Nombre del campo (label)"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
              <Input
                placeholder="Valor inicial"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button onClick={agregarCampo} disabled={!label.trim() || !valor.trim()}>
                Guardar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
