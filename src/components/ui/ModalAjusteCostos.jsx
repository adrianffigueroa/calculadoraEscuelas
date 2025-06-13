// src/components/ui/ModalAjusteCostos.jsx

import { useState } from 'react';
import { categoriasCostosFijos, categoriasCostosVariables } from '@/data/categoriasCostos';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'; // o el modal que uses

const ModalAjusteCostos = ({ open, onClose }) => {
  const { setCostoAjustado } = useCostosAjustados();

  const [tipoCosto, setTipoCosto] = useState('fijo');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState('');
  const [nuevoCosto, setNuevoCosto] = useState('');

  const handleAjustar = () => {
    if (subcategoriaSeleccionada && nuevoCosto) {
      const nombreNormalizado = subcategoriaSeleccionada.replace(/\s*\(\d+\)\s*/g, '').trim();
      setCostoAjustado(nombreNormalizado, parseFloat(nuevoCosto));
      handleReset();
    }
  };

  const handleReset = () => {
    setCategoriaSeleccionada('');
    setSubcategoriaSeleccionada('');
    setNuevoCosto('');
  };

  const categorias = tipoCosto === 'fijo' ? categoriasCostosFijos : categoriasCostosVariables;
  const subcategorias = categorias[categoriaSeleccionada] || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle>Ajustar Costos Unitarios</DialogTitle>

        <div className="flex flex-col gap-4">
          {/* Selector tipo de costo */}
          <div>
            <label className="block mb-1 font-medium">Tipo de costo</label>
            <select
              value={tipoCosto}
              onChange={(e) => {
                setTipoCosto(e.target.value);
                handleReset();
              }}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="fijo">Costos Fijos</option>
              <option value="variable">Costos Variables</option>
            </select>
          </div>

          {/* Selector categoría */}
          <div>
            <label className="block mb-1 font-medium">Categoría</label>
            <select
              value={categoriaSeleccionada}
              onChange={(e) => {
                setCategoriaSeleccionada(e.target.value);
                setSubcategoriaSeleccionada('');
              }}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Seleccione categoría</option>
              {Object.keys(categorias).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Selector subcategoría */}
          {categoriaSeleccionada && (
            <div>
              <label className="block mb-1 font-medium">Subcategoría</label>
              <select
                value={subcategoriaSeleccionada}
                onChange={(e) => setSubcategoriaSeleccionada(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              >
                <option value="">Seleccione subcategoría</option>
                {subcategorias.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Input nuevo costo */}
          {subcategoriaSeleccionada && (
            <div>
              <label className="block mb-1 font-medium">Nuevo costo unitario</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={nuevoCosto}
                onChange={(e) => setNuevoCosto(e.target.value)}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          )}

          {/* Botones */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cambiar otro costo
            </button>
            <button
              onClick={() => {
                handleAjustar();
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Aceptar y cerrar
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAjusteCostos;
