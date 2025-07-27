const generateId = () => Math.random().toString(36).substr(2, 9);

export const initialGastosFijos = (docentesObjetivo) => [
  {
    item: 'Equipo técnico-pedagógico a cargo del diseño y monitoreo',
    subitems: [
      { id: generateId(), name: 'Coordinador/a', cantidad: docentesObjetivo },
      {
        id: generateId(),
        name: 'Especialista técnico-pedagógico a cargo del diseño y planificación de escuelas seleccionadas',
        cantidad: docentesObjetivo,
      },
      {
        id: generateId(),
        name: 'Especialista a cargo del monitoreo, sistematización y análisis de las acciones',
        cantidad: docentesObjetivo,
      },
    ],
    extras: [],
  },
  {
    item: 'Equipo docente a cargo de la implementación',
    subitems: [
      { id: generateId(), name: 'Psicopedagogas', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Especialistas en lengua', cantidad: docentesObjetivo },
      {
        id: generateId(),
        name: 'Especialistas en matemáticas',
        cantidad: docentesObjetivo,
      },
      { id: generateId(), name: 'Especialistas en EIB', cantidad: docentesObjetivo },
    ],
    extras: [],
  },
  {
    item: 'Diseño e impresión de cuadernillos/materiales',
    subitems: [
      {
        id: generateId(),
        name: 'Diseño de cuadernillos/materiales para las capacitaciones',
        cantidad: docentesObjetivo,
      },
    ],
    extras: [],
  },
  {
    item: 'Equipos de imagen y audio',
    subitems: [
      { id: generateId(), name: 'Micrófonos', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Parlantes', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Proyector', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Pantalla para el proyector', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Router inalámbrico', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Estabilizador de tensión', cantidad: docentesObjetivo },
    ],
    extras: [],
  },
  {
    item: 'Licencias de software',
    subitems: [
      {
        id: generateId(),
        name: 'Licencias para videoconferencias',
        cantidad: docentesObjetivo,
      },
    ],
    extras: [],
  },
];

export const initialGastosVariables = (docentesObjetivo, docentesRurales) => [
  {
    item: 'Impresión de cuadernillos/materiales para las capacitaciones',
    subitems: [
      {
        id: generateId(),
        name: 'Impresiones (2)',
        cantidad: docentesObjetivo,
      },
      {
        id: generateId(),
        name: 'Acaballado (3)',
        cantidad: docentesObjetivo,
      },
      { id: generateId(), name: 'Laminado (3)', cantidad: docentesObjetivo },
    ],
    extras: [],
  },
  {
    item: 'Abono transporte público',
    subitems: [
      {
        id: generateId(),
        name: 'Abono transporte público',
        cantidad: (docentesObjetivo - docentesRurales) * 2,
      },
    ],
    extras: [],
  },
  {
    item: 'Adicional gasto de combustible',
    subitems: [{ id: generateId(), name: 'Gasto de combustible', cantidad: docentesRurales }],
    extras: [],
  },
  {
    item: 'Adicional salarial por capacitación',
    subitems: [
      {
        id: generateId(),
        name: 'Adicional salarial',
        cantidad: docentesObjetivo,
      },
      { id: generateId(), name: 'Presentismo', cantidad: docentesObjetivo },
    ],
    extras: [],
  },
  {
    item: 'Paquete de datos (6 Gb por 60 días)',
    subitems: [
      {
        id: generateId(),
        name: 'Conectividad móvil',
        cantidad: docentesObjetivo,
      },
    ],
    extras: [],
  },
  {
    item: 'Refrigerio',
    subitems: [
      { id: generateId(), name: 'Bebida', cantidad: docentesObjetivo },
      { id: generateId(), name: 'Comida', cantidad: docentesObjetivo },
    ],
    extras: [],
  },
];
