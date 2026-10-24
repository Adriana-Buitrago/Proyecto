export type EventItem = {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
};

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  description: string;
};

export const events: EventItem[] = [
  {
    id: 'event-001',
    name: 'Boda de Laura y Andrés',
    date: '14 de noviembre de 2026',
    location: 'Hacienda Los Arrayanes, Bogotá',
    description:
      'DJ, sonido profesional, luces ambientales y pista de baile.',
  },
  {
    id: 'event-002',
    name: 'Cumpleaños de Santiago',
    date: '21 de noviembre de 2026',
    location: 'Salón Mirador, Chía',
    description:
      'Música crossover, cabina DJ y sistema de sonido para baile.',
  },
  {
    id: 'event-003',
    name: 'Fiesta empresarial Nova',
    date: '4 de diciembre de 2026',
    location: 'Centro de Convenciones, Bogotá',
    description:
      'Sonido para discursos, micrófonos inalámbricos e iluminación.',
  },
  {
    id: 'event-004',
    name: 'Quinceañera de Valentina',
    date: '12 de diciembre de 2026',
    location: 'Club Social La Colina, Bogotá',
    description:
      'DJ, luces móviles, máquina de humo y sonido para pista.',
  },
];

export const equipment: EquipmentItem[] = [
  {
    id: 'equipment-1',
    name: 'Cabina de sonido',
    category: 'Sonido',
    pricePerDay: 250000,
    description: 'Sistema de sonido para fiestas y reuniones.',
  },
  {
    id: 'equipment-2',
    name: 'Luces LED',
    category: 'Iluminación',
    pricePerDay: 120000,
    description:
      'Iluminación LED multicolor para pistas de baile.',
  },
  {
    id: 'equipment-3',
    name: 'Consola DJ',
    category: 'DJ',
    pricePerDay: 180000,
    description: 'Consola para mezclar música durante los eventos.',
  },
];