import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import ModalAgregarCostoExtra from './ModalAgregarCostoExtra';
import useCostosUnitarios from '@/hooks/useCostosUnitarios';
import { useCostosAjustados } from '@/context/CostosAjustadosContext';
import { initialGastosVariables } from '@/data/initialGastos';

const generateId = () => Math.random().toString(36).substr(2, 9);
const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

const GastosVariablesAccordion = ({
  gastosVariables = initialGastosVariables,
  setGastosVariables,
}) => {
  const { costosUnitarios, loading } = useCostosUnitarios();
  const { costosAjustados } = useCostosAjustados();

  const [extrasVariables, setExtrasVariables] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExtra, setEditingExtra] = useState(null);

  const handleAgregarExtra = (index) => {
    setGastosVariables((prev) =>
      prev.map((grupo, i) => {
        if (i !== index) return grupo;
        return {
          ...grupo,
          extras: [
            ...grupo.extras,
            {
              id: generateId(),
              name: '',
              cantidad: 0,
              costoUnitario: 0,
            },
          ],
        };
      })
    );
  };

  const handleCantidadChange = (itemIndex, subitemId, newCantidad, isExtra = false) => {
    setGastosVariables((prev) =>
      prev.map((grupo, i) => {
        if (i !== itemIndex) return grupo;
        const targetArray = isExtra ? grupo.extras : grupo.subitems;
        return {
          ...grupo,
          [isExtra ? 'extras' : 'subitems']: targetArray.map((s) =>
            s.id === subitemId ? { ...s, cantidad: parseInt(newCantidad, 10) || 0 } : s
          ),
        };
      })
    );
  };

  const handleCostoUnitarioChange = (itemIndex, subitemId, newCosto, isExtra = false) => {
    setGastosVariables((prev) =>
      prev.map((grupo, i) => {
        if (i !== itemIndex) return grupo;
        const targetArray = isExtra ? grupo.extras : grupo.subitems;
        return {
          ...grupo,
          [isExtra ? 'extras' : 'subitems']: targetArray.map((s) =>
            s.id === subitemId ? { ...s, costoUnitario: parseFloat(newCosto) || 0 } : s
          ),
        };
      })
    );
  };

  const handleExtraNameChange = (itemIndex, subitemId, newValue) => {
    setGastosVariables((prev) =>
      prev.map((grupo, i) => {
        if (i !== itemIndex) return grupo;
        return {
          ...grupo,
          extras: grupo.extras.map((s) => (s.id === subitemId ? { ...s, name: newValue } : s)),
        };
      })
    );
  };

  const calcularCostoTotal = (cantidad, costoUnitario) => {
    return cantidad * costoUnitario;
  };

  // 👉 HANDLERS para el modal de Costos Extras:
  const handleSaveExtra = (extra) => {
    setExtrasVariables((prev) => {
      const exists = prev.find((e) => e.id === extra.id);
      if (exists) {
        // Update
        return prev.map((e) => (e.id === extra.id ? extra : e));
      }
      // Add new
      return [...prev, extra];
    });
  };

  const handleDeleteExtra = (id) => {
    setExtrasVariables((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <>
      <Accordion type="multiple" className="w-full space-y-2">
        {gastosVariables.map((grupo, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-lg font-medium">{grupo.item}</AccordionTrigger>
            <AccordionContent>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Subítem</th>
                      <th className="px-4 py-2">Cantidad</th>
                      <th className="px-4 py-2">Costo Unitario</th>
                      <th className="px-4 py-2">Costo Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {/* Subitems fijos */}
                    {grupo.subitems.map((subitem) => {
                      const normalizedName = normalizeName(subitem.name);
                      const costoUnitario =
                        costosAjustados[normalizedName] ?? costosUnitarios[normalizedName] ?? 0;

                      return (
                        <tr key={subitem.id}>
                          <td className="px-4 py-2 text-gray-800">{subitem.name}</td>
                          <td className="px-4 py-2">
                            <input
                              type="number"
                              min="0"
                              className="border rounded px-2 py-1 w-20"
                              value={subitem.cantidad}
                              onChange={(e) =>
                                handleCantidadChange(index, subitem.id, e.target.value)
                              }
                            />
                          </td>
                          <td className="px-4 py-2">$ {costoUnitario.toFixed(2)}</td>
                          <td className="px-4 py-2">
                            $ {calcularCostoTotal(subitem.cantidad, costoUnitario).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* 👉 Costos Extras */}
        <AccordionItem value="extras">
          <AccordionTrigger className="text-lg font-medium">Costos Extras</AccordionTrigger>
          <AccordionContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Cantidad</th>
                    <th className="px-4 py-2">Costo Unitario</th>
                    <th className="px-4 py-2">Costo Total</th>
                    <th className="px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {extrasVariables.map((extra) => (
                    <tr key={extra.id}>
                      <td className="px-4 py-2">{extra.name}</td>
                      <td className="px-4 py-2">{extra.cantidad}</td>
                      <td className="px-4 py-2">${extra.costoUnitario.toFixed(2)}</td>
                      <td className="px-4 py-2">
                        ${(extra.cantidad * extra.costoUnitario).toFixed(2)}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => {
                            setEditingExtra(extra);
                            setIsModalOpen(true);
                          }}
                        >
                          Editar
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteExtra(extra.id)}
                        >
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {extrasVariables.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-2 italic text-gray-500">
                        No hay costos extras.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 👉 Botón debajo del Accordion */}
      <Button
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow"
        onClick={() => {
          setEditingExtra(null);
          setIsModalOpen(true);
        }}
      >
        + Agregar Costo Extra
      </Button>

      {/* Modal */}
      <ModalAgregarCostoExtra
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExtra}
        initialData={editingExtra}
      />
    </>
  );
};

export default GastosVariablesAccordion;
