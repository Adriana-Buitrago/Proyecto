export type EventItem = {
  id: string;
  name: string;
  eventType: string;
  date: string;
  location: string;
  durationHours: number;
  description: string;
  imageUrl: string;
};

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  status: string;
  pricePerDay: number;
  description: string;
};

export const events: EventItem[] = [
  {
    id: 'event-001',
    name: 'Boda de Laura y Andrés',
    eventType: 'Boda',
    date: '14 de noviembre de 2026',
    location: 'Hacienda Los Arrayanes, Bogotá',
    durationHours: 6,
    description: 'DJ, sonido profesional, luces ambientales y pista de baile.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900',
  },
  {
    id: 'event-002',
    name: 'Cumpleaños de Santiago',
    eventType: 'Cumpleaños',
    date: '21 de noviembre de 2026',
    location: 'Salón Mirador, Chía',
    durationHours: 5,
    description: 'Música crossover, cabina DJ y sistema de sonido para baile.',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900',
  },
  {
    id: 'event-003',
    name: 'Fiesta empresarial Nova',
    eventType: 'Empresarial',
    date: '4 de diciembre de 2026',
    location: 'Centro de Convenciones, Bogotá',
    durationHours: 4,
    description: 'Sonido para discursos, micrófonos inalámbricos e iluminación.',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900',
  },
  {
    id: 'event-004',
    name: 'Quinceañera de Valentina',
    eventType: 'Quinceañera',
    date: '12 de diciembre de 2026',
    location: 'Club Social La Colina, Bogotá',
    durationHours: 6,
    description: 'DJ, luces móviles, máquina de humo y sonido para pista.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900',
  },
];

export const equipment: EquipmentItem[] = [
  {
    id: 'eq-001',
    name: 'Parlante activo JBL EON 715',
    category: 'Sonido',
    brand: 'JBL',
    quantity: 2,
    status: 'Disponible',
    pricePerDay: 180000,
    description: 'Parlantes principales para eventos medianos.',
  },
  {
    id: 'eq-002',
    name: 'Subwoofer JBL PRX 818XLF',
    category: 'Sonido',
    brand: 'JBL',
    quantity: 2,
    status: 'Reservado',
    pricePerDay: 220000,
    description: 'Graves potentes para pistas de baile.',
  },
  {
    id: 'eq-003',
    name: 'Consola DJ Pioneer DDJ-FLX10',
    category: 'Sonido',
    brand: 'Pioneer DJ',
    quantity: 1,
    status: 'Disponible',
    pricePerDay: 250000,
    description: 'Controladora profesional para mezcla musical.',
  },
  {
    id: 'eq-004',
    name: 'Micrófono inalámbrico Shure BLX',
    category: 'Sonido',
    brand: 'Shure',
    quantity: 3,
    status: 'Disponible',
    pricePerDay: 60000,
    description: 'Micrófonos para presentaciones y brindis.',
  },
  {
    id: 'eq-005',
    name: 'Cabeza móvil Beam moving head',
    category: 'Iluminación',
    brand: 'Chauvet DJ',
    quantity: 4,
    status: 'Disponible',
    pricePerDay: 90000,
    description: 'Efectos dinámicos para escenario y pista.',
  },
  {
    id: 'eq-006',
    name: 'Barra LED RGB',
    category: 'Iluminación',
    brand: 'ADJ',
    quantity: 6,
    status: 'En mantenimiento',
    pricePerDay: 45000,
    description: 'Iluminación ambiental con mezcla de colores.',
  },
  {
    id: 'eq-007',
    name: 'Láser RGB para escenario',
    category: 'Iluminación',
    brand: 'Laserworld',
    quantity: 1,
    status: 'Disponible',
    pricePerDay: 75000,
    description: 'Efectos de luz para fiestas y discotecas.',
  },
  {
    id: 'eq-008',
    name: 'Máquina de humo',
    category: 'Accesorios',
    brand: 'Antari',
    quantity: 2,
    status: 'Reservado',
    pricePerDay: 55000,
    description: 'Humo escénico para resaltar los haces de luz.',
  },
  {
    id: 'eq-009',
    name: 'Trípode para parlante',
    category: 'Accesorios',
    brand: 'Proel',
    quantity: 4,
    status: 'Disponible',
    pricePerDay: 20000,
    description: 'Soporte estable para parlantes PA.',
  },
  {
    id: 'eq-010',
    name: 'Cable XLR de 10 metros',
    category: 'Accesorios',
    brand: 'Soundking',
    quantity: 8,
    status: 'Disponible',
    pricePerDay: 8000,
    description: 'Conexión balanceada para audio profesional.',
  },
  {
    id: 'eq-011',
    name: 'Mezclador digital de audio',
    category: 'Sonido',
    brand: 'Behringer',
    quantity: 1,
    status: 'Disponible',
    pricePerDay: 160000,
    description: 'Control de canales y procesamiento de sonido.',
  },
  {
    id: 'eq-012',
    name: 'Par LED tipo wash',
    category: 'Iluminación',
    brand: 'ADJ',
    quantity: 8,
    status: 'Disponible',
    pricePerDay: 35000,
    description: 'Baño de color para paredes y decoración.',
  },
];
