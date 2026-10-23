export interface EventItem {
  id: string;
  name: string;
  eventType: string;
  date: string;
  location: string;
  durationHours: number;
  description: string;
  imageUrl: string;
}

export interface Equipment {
  id: string;
  name: string;
  category: 'Sonido' | 'Iluminación' | 'Accesorios';
  brand: string;
  quantity: number;
  status: 'Disponible' | 'En mantenimiento' | 'Reservado';
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
