
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

import { equipment } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';

type EquipmentDetailRouteProp = RouteProp<
  RootStackParamList,
  'EquipmentDetail'
>;

export default function EquipmentDetailScreen() {
  const route = useRoute<EquipmentDetailRouteProp>();
  const { equipmentId } = route.params;

  const item = equipment.find((equipmentItem) => equipmentItem.id === equipmentId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Equipo no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>CATÁLOGO DE EQUIPOS</Text>
      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{item.category}</Text>

        <Text style={styles.label}>Precio por día</Text>
        <Text style={styles.price}>
          ${item.pricePerDay.toLocaleString('es-CO')} COP
        </Text>

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{item.description}</Text>
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
  price: {
    color: '#15803D',
    fontSize: 21,
    fontWeight: 'bold',
  },
});
