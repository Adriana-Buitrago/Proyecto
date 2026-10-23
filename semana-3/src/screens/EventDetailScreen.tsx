
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { events } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';

type EventDetailRouteProp = RouteProp<
  RootStackParamList,
  'EventDetail'
>;

export default function EventDetailScreen() {
  const route = useRoute<EventDetailRouteProp>();
  const { eventId } = route.params;

  const event = events.find((item) => item.id === eventId);

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Evento no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>DETALLE DEL EVENTO</Text>
      <Text style={styles.title}>{event.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{event.date}</Text>

        <Text style={styles.label}>Lugar</Text>
        <Text style={styles.value}>{event.location}</Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{event.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 20,
  },
  eyebrow: {
    color: '#7C3AED',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  title: {
    color: '#1E1B4B',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 8,
  },
  label: {
    color: '#7C3AED',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    color: '#334155',
    fontSize: 16,
    lineHeight: 23,
  },
});
