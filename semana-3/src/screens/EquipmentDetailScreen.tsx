
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

  const item = equipment.find(
    (equipmentItem) => equipmentItem.id === equipmentId,
  );

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Equipo no encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.section}>DETALLE DEL EQUIPO</Text>
      <Text style={styles.title}>{item.name}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Categoría</Text>
        <Text style={styles.value}>{item.category}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Precio por día</Text>
        <Text style={styles.price}>
          ${item.pricePerDay.toLocaleString('es-CO')} COP
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Descripción</Text>
        <Text style={styles.value}>{item.description}</Text>
      </View>

      <Text style={styles.note}>
        Consulta la disponibilidad del equipo para la fecha de tu evento.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0718',
    padding: 20,
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
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 22,
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
  price: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: 'bold',
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
