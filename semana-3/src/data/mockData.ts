

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
    id: 'event-1',
    name: 'Boda elegante',
    date: '15 de noviembre de 2026',
    location: 'Salón Imperial',
    description: 'Sonido profesional e iluminación ambiental para una celebración inolvidable.',
  },
  {
    id: 'event-2',
    name: 'Fiesta empresarial',
    date: '22 de noviembre de 2026',
    location: 'Centro de Eventos',
    description: 'Música, sonido e iluminación para eventos corporativos.',
  },
  {
    id: 'event-3',
    name: 'Cumpleaños musical',
    date: '5 de diciembre de 2026',
    location: 'Club Social',
    description: 'Una experiencia musical con DJ y luces de colores.',
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
    description: 'Iluminación LED multicolor para pistas de baile.',
  },
  {
    id: 'equipment-3',
    name: 'Consola DJ',
    category: 'DJ',
    pricePerDay: 180000,
    description: 'Consola para mezclar música durante los eventos.',
  },
];
