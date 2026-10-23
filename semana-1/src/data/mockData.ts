import type { EventItem } from '../types';

export const events: EventItem[] = [
  {
    id: 'event-001',
    name: 'Boda de Laura y Andrés',
    eventType: 'Boda',
    date: '2026-11-14',
    location: 'Hacienda Los Arrayanes, Bogotá',
    durationHours: 6,
    description: 'DJ, sonido profesional, luces ambientales y pista de baile.',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900'
  },
  {
    id: 'event-002',
    name: 'Cumpleaños de Santiago',
    eventType: 'Cumpleaños',
    date: '2026-11-21',
    location: 'Salón Mirador, Chía',
    durationHours: 5,
    description: 'Música crossover, cabina DJ y sistema de sonido para baile.',
    imageUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1?w=900'
  },
  {
    id: 'event-003',
    name: 'Fiesta empresarial Nova',
    eventType: 'Evento empresarial',
    date: '2026-12-04',
    location: 'Centro de Convenciones, Bogotá',
    durationHours: 4,
    description: 'Sonido para discursos, micrófonos inalámbricos e iluminación.',
    imageUrl: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=900'
  },
  {
    id: 'event-004',
    name: 'Quinceañera de Valentina',
    eventType: 'Quinceañera',
    date: '2026-12-12',
    location: 'Club Social La Colina, Bogotá',
    durationHours: 6,
    description: 'DJ, luces móviles, máquina de humo y sonido para pista.',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900'
  }
];
