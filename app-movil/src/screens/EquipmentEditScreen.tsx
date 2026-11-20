
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { getEquipmentById, updateEquipment } from '../services/api';
import type { EquipmentItem } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';
import EquipmentForm from '../components/EquipmentForm';
import type {
  EquipmentFormValues,
  EquipmentFormData,
} from '../schemas/equipmentSchema';

type EditRouteProp = RouteProp<
  RootStackParamList,
  'EquipmentEdit'
>;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'EquipmentEdit'
>;

export default function EquipmentEditScreen() {
  const route = useRoute<EditRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { equipmentId } = route.params;

  const [initialValues, setInitialValues] =
    useState<EquipmentFormValues | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadEquipment() {
      try {
        setLoading(true);
        setError('');

        const item: EquipmentItem = await getEquipmentById(equipmentId);

        if (active) {
          setInitialValues({
            name: item.name,
            category: item.category,
            brand: item.brand,
            quantity: String(item.quantity),
            status: item.status,
            pricePerDay: String(item.pricePerDay),
            description: item.description,
          });
        }
      } catch (err) {
        console.error('Error cargando equipo para editar:', err);

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
  }, [equipmentId]);

  async function handleUpdate(data: EquipmentFormData) {
    try {
      setSaving(true);
      setFormError('');

      await updateEquipment(equipmentId, data);

      navigation.goBack();
    } catch (err) {
      console.error('Error actualizando equipo:', err);

      setFormError(
        err instanceof Error
          ? err.message
          : 'No fue posible actualizar el equipo.'
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.message}>
          Cargando información del equipo...
        </Text>
      </SafeAreaView>
    );
  }

  if (error || !initialValues) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>
          {error || 'No se encontró el equipo.'}
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Editar equipo</Text>

        <Text style={styles.subtitle}>
          Modifica la información del equipo registrado.
        </Text>

        <EquipmentForm
          initialValues={initialValues}
          onSubmit={handleUpdate}
          submitLabel="Actualizar equipo"
          saving={saving}
          submitError={formError}
          onCancel={() => navigation.goBack()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0718',
  },
  scroll: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 45,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    color: '#B8B3CC',
    fontSize: 14,
    marginBottom: 20,
  },
  message: {
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 30,
  },
  error: {
    color: '#FF7777',
    textAlign: 'center',
    margin: 20,
  },
});
