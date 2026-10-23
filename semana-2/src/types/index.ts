export type EquipmentCategory = 'Sonido' | 'Iluminación' | 'Accesorios';
export type EquipmentStatus = 'Disponible' | 'En mantenimiento' | 'Reservado';

export interface Equipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  brand: string;
  quantity: number;
  status: EquipmentStatus;
  description: string;
}

export interface EventItem {
  id: string;
  name: string;
  eventType: string;
  date: string;
  location: string;
  durationHours: number;
}

export interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  clientType: 'Persona' | 'Empresa';
}

export interface Booking {
  id: string;
  clientId: string;
  eventId: string;
  eventDate: string;
  totalPrice: number;
  status: 'Pendiente' | 'Confirmada' | 'Finalizada' | 'Cancelada';
}
