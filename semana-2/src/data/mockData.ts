import type { Booking, Client, Equipment, EventItem } from '../types';

export const equipment: Equipment[] = [
  { id: 'eq-001', name: 'Parlante activo JBL EON 715', category: 'Sonido', brand: 'JBL', quantity: 2, status: 'Disponible', description: 'Parlantes principales para eventos medianos.' },
  { id: 'eq-002', name: 'Subwoofer JBL PRX 818XLF', category: 'Sonido', brand: 'JBL', quantity: 2, status: 'Reservado', description: 'Graves potentes para pistas de baile.' },
  { id: 'eq-003', name: 'Consola DJ Pioneer DDJ-FLX10', category: 'Sonido', brand: 'Pioneer DJ', quantity: 1, status: 'Disponible', description: 'Controladora profesional para mezcla musical.' },
  { id: 'eq-004', name: 'Micrófono inalámbrico Shure BLX', category: 'Sonido', brand: 'Shure', quantity: 3, status: 'Disponible', description: 'Micrófonos para presentaciones y brindis.' },
  { id: 'eq-005', name: 'Cabeza móvil Beam  moving head', category: 'Iluminación', brand: 'Chauvet DJ', quantity: 4, status: 'Disponible', description: 'Efectos dinámicos para escenario y pista.' },
  { id: 'eq-006', name: 'Barra LED RGB', category: 'Iluminación', brand: 'ADJ', quantity: 6, status: 'En mantenimiento', description: 'Iluminación ambiental con mezcla de colores.' },
  { id: 'eq-007', name: 'Láser RGB para escenario', category: 'Iluminación', brand: 'Laserworld', quantity: 1, status: 'Disponible', description: 'Efectos de luz para fiestas y discotecas.' },
  { id: 'eq-008', name: 'Máquina de humo', category: 'Accesorios', brand: 'Antari', quantity: 2, status: 'Reservado', description: 'Humo escénico para resaltar los haces de luz.' },
  { id: 'eq-009', name: 'Trípode para parlante', category: 'Accesorios', brand: 'Proel', quantity: 4, status: 'Disponible', description: 'Soporte estable para parlantes PA.' },
  { id: 'eq-010', name: 'Cable XLR de 10 metros', category: 'Accesorios', brand: 'Soundking', quantity: 8, status: 'Disponible', description: 'Conexión balanceada para audio profesional.' },
  { id: 'eq-011', name: 'Mezclador digital de audio', category: 'Sonido', brand: 'Behringer', quantity: 1, status: 'Disponible', description: 'Control de canales y procesamiento de sonido.' },
  { id: 'eq-012', name: 'Par LED tipo wash', category: 'Iluminación', brand: 'ADJ', quantity: 8, status: 'Disponible', description: 'Baño de color para paredes y decoración.' }
];

export const events: EventItem[] = [
  { id: 'event-001', name: 'Boda de Laura y Andrés', eventType: 'Boda', date: '2026-11-14', location: 'Hacienda Los Arrayanes, Bogotá', durationHours: 6 },
  { id: 'event-002', name: 'Cumpleaños de Santiago', eventType: 'Cumpleaños', date: '2026-11-21', location: 'Salón Mirador, Chía', durationHours: 5 },
  { id: 'event-003', name: 'Fiesta empresarial Nova', eventType: 'Empresarial', date: '2026-12-04', location: 'Centro de Convenciones, Bogotá', durationHours: 4 }
];

export const clients: Client[] = [
  { id: 'client-001', name: 'Laura Méndez', phone: '3105550101', email: 'laura@example.com', clientType: 'Persona' },
  { id: 'client-002', name: 'Santiago Rojas', phone: '3105550102', email: 'santiago@example.com', clientType: 'Persona' },
  { id: 'client-003', name: 'Nova Eventos SAS', phone: '6015550103', email: 'eventos.nova@example.com', clientType: 'Empresa' }
];

export const bookings: Booking[] = [
  { id: 'booking-001', clientId: 'client-001', eventId: 'event-001', eventDate: '2026-11-14', totalPrice: 1850000, status: 'Confirmada' },
  { id: 'booking-002', clientId: 'client-002', eventId: 'event-002', eventDate: '2026-11-21', totalPrice: 950000, status: 'Pendiente' },
  { id: 'booking-003', clientId: 'client-003', eventId: 'event-003', eventDate: '2026-12-04', totalPrice: 1400000, status: 'Confirmada' }
];
