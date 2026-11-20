
import { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getEquipmentById } from '../services/api';
import type { EquipmentItem } from '../data/mockData';
import { useSavedStore } from '../store/savedStore';
import type { RootStackParamList } from '../types/navigation';

type EquipmentDetailRouteProp = RouteProp<
  RootStackParamList,
  'EquipmentDetail'
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EquipmentDetail'
>;

export default function EquipmentDetailScreen() {
  const route = useRoute<EquipmentDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { equipmentId } = route.params;

  const [item, setItem] = useState<EquipmentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const addItem = useSavedStore((state) => state.addItem);
  const removeItem = useSavedStore((state) => state.removeItem);

  const saved = useSavedStore((state) =>
    state.savedItems.some((savedItem) => savedItem.id === equipmentId)
  );

  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadEquipment() {
        try {
          setLoading(true);
          setError('');

          const data = await getEquipmentById(equipmentId);

          if (active) {
            setItem(data);
          }
        } catch (err) {
          console.error('Error cargando detalle del equipo:', err);

          if (active) {
            setError(
              err instanceof Error
                ? err.message
                : 'No fue posible cargar el equipo.'
            );
          }
        } finally {
          if (active) {
            setLoading(false);
          }
        }
      }

      loadEquipment();

      return () => {
        active = false;
      };
    }, [equipmentId])
  );

  const handleSave = () => {
    if (!item) return;

    if (saved) {
      removeItem(item.id);
    } else {
      addItem(item);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.value}>Cargando equipo...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !item) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.container}>
          <Text style={styles.title}>Equipo no disponible</Text>
          <Text style={styles.note}>
            {error || 'No se encontró el equipo solicitado.'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.screen}
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
        <Text style={styles.section}>DETALLE DEL EQUIPO</Text>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <Text style={styles.title}>{item.name}</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Marca</Text>
          <Text style={styles.value}>{item.brand}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Cantidad en inventario</Text>
          <Text style={styles.value}>{item.quantity} unidades</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Estado</Text>
          <Text style={styles.status}>{item.status}</Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Alquiler por día</Text>
          <Text style={styles.price}>
            ${item.pricePerDay.toLocaleString('es-CO')} COP
          </Text>

          <Text style={styles.disclaimer}>
            Tarifa ficticia para demostración.
          </Text>

          <View style={styles.divider} />

          <Text style={styles.label}>Descripción</Text>
          <Text style={styles.value}>{item.description}</Text>
        </View>

        <Pressable
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EquipmentEdit', {
              equipmentId: item.id,
            })
          }
        >
          <Text style={styles.editButtonText}>Editar equipo</Text>
        </Pressable>

        <Pressable
          style={[
            styles.saveButton,
            saved && styles.savedButton,
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>
            {saved ? 'Quitar de guardados' : 'Guardar equipo'}
          </Text>
        </Pressable>

        <Text style={styles.note}>
          Consulta la disponibilidad del equipo para la fecha de tu evento.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0B0718',
  },
  scroll: {
    flex: 1,
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
    marginBottom: 16,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#292044',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  categoryText: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginTop: 12,
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
  status: {
    color: '#22D3EE',
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    color: '#22D3EE',
    fontSize: 22,
    fontWeight: 'bold',
  },
  disclaimer: {
    color: '#8E87A6',
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#352650',
    marginVertical: 8,
  },
  editButton: {
    backgroundColor: '#D6A84F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: '#101114',
    fontSize: 15,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#7C3AED',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  savedButton: {
    backgroundColor: '#352650',
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  note: {
    color: '#B8B3CC',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 18,
  },
});
