// src/utils/getTotalCostos.js

const normalizeName = (name) => name.replace(/\s*\(\d+\)\s*/g, '').trim();

export default function getTotalCostos(gastos, costosUnitarios) {
  let total = 0;

  gastos.forEach((grupo) => {
    // Subitems fijos
    grupo.subitems.forEach((subitem) => {
      const normalizedName = normalizeName(subitem.name);
      const costoUnitario = costosUnitarios[normalizedName] || 0;
      total += subitem.cantidad * costoUnitario;
    });

    // Extras
    grupo.extras.forEach((extra) => {
      total += extra.cantidad * extra.costoUnitario;
    });
  });

  return total;
}
