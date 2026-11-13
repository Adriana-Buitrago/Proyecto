
import type { EventItem, EquipmentItem } from '../data/mockData';

const API_URL = 'https://dj-sonido-luces-api.onrender.com';

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
