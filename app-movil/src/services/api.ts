
import type { EventItem, EquipmentItem } from '../data/mockData';

const API_URL = 'http://192.168.2.24:3001';

type ApiEvent = {
  id: string;
  name: string;
  event_type: string;
  date: string;
  location: string;
  duration_hours: number;
  description: string;
  image_url: string;
};

type ApiEquipment = {
  id: string;
  name: string;
  category: string;
  brand: string;
  quantity: number;
  status: string;
  price_per_day: number;
  description: string;
};

async function request<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error ${response.status} al consultar ${endpoint}`);
  }

  return response.json() as Promise<T>;
}

export async function getEvents(): Promise<EventItem[]> {
  const data = await request<ApiEvent[]>('/api/events');

  return data.map((event) => ({
    id: event.id,
    name: event.name,
    eventType: event.event_type,
    date: event.date,
    location: event.location,
    durationHours: event.duration_hours,
    description: event.description,
    imageUrl: event.image_url,
  }));
}

export async function getEquipment(): Promise<EquipmentItem[]> {
  const data = await request<ApiEquipment[]>('/api/equipment');

  return data.map((item) => ({
    id: item.id,
    name: item.name,
    category: item.category,
    brand: item.brand,
    quantity: item.quantity,
    status: item.status,
    pricePerDay: item.price_per_day,
    description: item.description,
  }));
}


export type NewEquipment = Omit<EquipmentItem, 'id'>;

type CreateEquipmentResponse = {
  message: string;
  data: ApiEquipment;
};

export async function createEquipment(
  equipment: NewEquipment
): Promise<EquipmentItem> {
  const response = await fetch(`${API_URL}/api/equipment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: equipment.name,
      category: equipment.category,
      brand: equipment.brand,
      quantity: equipment.quantity,
      status: equipment.status,
      price_per_day: equipment.pricePerDay,
      description: equipment.description,
    }),
  });

  if (!response.ok) {
    throw new Error(`Error ${response.status} al registrar el equipo`);
  }

  const result =
    (await response.json()) as CreateEquipmentResponse;

  return {
    id: result.data.id,
    name: result.data.name,
    category: result.data.category,
    brand: result.data.brand,
    quantity: result.data.quantity,
    status: result.data.status,
    pricePerDay: result.data.price_per_day,
    description: result.data.description,
  };
}
