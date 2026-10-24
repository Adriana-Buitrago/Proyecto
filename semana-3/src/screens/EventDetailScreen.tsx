import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
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
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.section}>DETALLE DEL EVENTO</Text>

      <Image
        source={{ uri: event.imageUrl }}
        style={styles.eventImage}
        resizeMode="cover"
        accessibilityLabel={`Imagen de ${event.name}`}
      />

      <Text style={styles.category}>{event.eventType}</Text>
      <Text style={styles.title}>{event.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Fecha</Text>
        <Text style={styles.value}>{event.date}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Lugar</Text>
        <Text style={styles.value}>{event.location}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Duración</Text>
        <Text style={styles.value}>
          {event.durationHours} horas
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{event.description}</Text>
      </View>

      <Text style={styles.note}>
        Consulta la disponibilidad de nuestros servicios de sonido e
        iluminación para tu celebración.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0718',
  },
  container: {
    padding: 20,
    paddingBottom: 32,
  },
  eyebrow: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  section: {
    color: '#B8B3CC',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 22,
    marginBottom: 14,
  },
  eventImage: {
    width: '100%',
    height: 230,
    borderRadius: 18,
    backgroundColor: '#292044',
  },
  category: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 18,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    gap: 8,
  },
  label: {
    color: '#22D3EE',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#352650',
    marginVertical: 8,
  },
  note: {
    color: '#B8B3CC',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 18,
  },
});
