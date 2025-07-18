const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialGastosFijos = (cambiarCantidades = false) => [
  {
    item: 'Equipo técnico-pedagógico a cargo del diseño y monitoreo',
    subitems: [
      { id: generateId(), name: 'Coordinador/a', cantidad: cambiarCantidades ? 1 : 0 },
      {
        id: generateId(),
        name: 'Especialista técnico-pedagógico a cargo del diseño y planificación de escuelas seleccionadas',
        cantidad: cambiarCantidades ? 1 : 0,
      },
      {
        id: generateId(),
        name: 'Especialista a cargo del monitoreo, sistematización y análisis de las acciones',
        cantidad: cambiarCantidades ? 1 : 0,
      },
    ],
    extras: [],
  },
  {
    item: 'Equipo docente a cargo de la implementación',
    subitems: [
      { id: generateId(), name: 'Psicopedagogas', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Especialistas en lengua', cantidad: cambiarCantidades ? 1 : 0 },
      {
        id: generateId(),
        name: 'Especialistas en matemáticas',
        cantidad: cambiarCantidades ? 1 : 0,
      },
      { id: generateId(), name: 'Especialistas en EIB', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Diseño e impresión de cuadernillos/materiales',
    subitems: [
      {
        id: generateId(),
        name: 'Diseño de cuadernillos/materiales para las capacitaciones',
        cantidad: cambiarCantidades ? 20 : 0,
      },
    ],
    extras: [],
  },
  {
    item: 'Equipos de imagen y audio',
    subitems: [
      { id: generateId(), name: 'Micrófonos', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Parlantes', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Proyector', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Pantalla para el proyector', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Router inalámbrico', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Estabilizador de tensión', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Licencias de software',
    subitems: [
      {
        id: generateId(),
        name: 'Licencias para videoconferencias',
        cantidad: cambiarCantidades ? 1 : 0,
      },
    ],
    extras: [],
  },
];

export const initialGastosVariables = (cambiarCantidades = false) => [
  {
    item: 'Impresión de cuadernillos/materiales para las capacitaciones',
    subitems: [
      { id: generateId(), name: 'Impresiones (2)', cantidad: cambiarCantidades ? 20 : 0 },
      { id: generateId(), name: 'Acaballado (3)', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Laminado (3)', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Abono transporte público',
    subitems: [
      { id: generateId(), name: 'Abono transporte público', cantidad: cambiarCantidades ? 2 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Adicional gasto de combustible',
    subitems: [
      { id: generateId(), name: 'Gasto de combustible', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Adicional salarial por capacitación',
    subitems: [
      { id: generateId(), name: 'Adicional salarial', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Presentismo', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Paquete de datos (6 Gb por 60 días)',
    subitems: [
      { id: generateId(), name: 'Conectividad móvil', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
  {
    item: 'Refrigerio',
    subitems: [
      { id: generateId(), name: 'Bebida', cantidad: cambiarCantidades ? 1 : 0 },
      { id: generateId(), name: 'Comida', cantidad: cambiarCantidades ? 1 : 0 },
    ],
    extras: [],
  },
];
