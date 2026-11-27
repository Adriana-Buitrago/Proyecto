
import { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getEquipment, createEquipment } from '../services/api';
import type { RootStackParamList } from '../types/navigation';
import EquipmentForm from '../components/EquipmentForm';
import type { EquipmentFormData } from '../schemas/equipmentSchema';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

export default function EquipmentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState('');

  const {
    data: equipment = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['equipment'],
    queryFn: getEquipment,
  });

  const createMutation = useMutation({
    mutationFn: createEquipment,
    onSuccess: (created) => {
      queryClient.setQueryData(
        ['equipment'],
        (current: typeof equipment = []) => [created, ...current]
      );

      setSearch('');
      setShowForm(false);
      setFormError('');
    },
    onError: (error) => {
      console.error('Error creando equipo:', error);

      setFormError(
        error instanceof Error
          ? error.message
          : 'No fue posible registrar el equipo.'
      );
    },
  });

  const filteredEquipment = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return equipment;

    return equipment.filter((item) =>
      `${item.name} ${item.category} ${item.brand}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [search, equipment]);

  async function handleCreate(data: EquipmentFormData) {
    setFormError('');
    createMutation.mutate(data);
  }

  function handleToggleForm() {
    setShowForm((current) => !current);
    setFormError('');
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredEquipment}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
              <Text style={styles.title}>Equipos</Text>
              <Text style={styles.subtitle}>
                Administra los equipos disponibles para tus eventos.
              </Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={handleToggleForm}
            >
              <Text style={styles.primaryButtonText}>
                {showForm ? 'Cancelar registro' : '+ Crear equipo'}
              </Text>
            </Pressable>

            {showForm && (
              <EquipmentForm
                onSubmit={handleCreate}
                submitLabel="Guardar equipo"
                saving={createMutation.isPending}
                submitError={formError}
                onCancel={handleToggleForm}
              />
            )}

            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar equipos..."
                placeholderTextColor="#8E87A6"
              />
            </View>

            <View style={styles.resultsHeader}>
              <Text style={styles.sectionTitle}>INVENTARIO</Text>
              <Text style={styles.resultCount}>
                {filteredEquipment.length} equipos
              </Text>
            </View>

            {isLoading && (
              <Text style={styles.message}>Cargando equipos...</Text>
            )}

            {isError && equipment.length === 0 && (
              <Text style={styles.error}>
                No fue posible cargar los equipos.
              </Text>
            )}
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('EquipmentDetail', {
                equipmentId: item.id,
              })
            }
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>

              <View
                style={[
                  styles.statusBadge,
                  item.status.toLowerCase() === 'disponible'
                    ? styles.availableBadge
                    : styles.otherStatusBadge,
                ]}
              >
                <Text
                  style={[
                    styles.status,
                    item.status.toLowerCase() === 'disponible'
                      ? styles.availableStatus
                      : styles.otherStatus,
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>

            <Text style={styles.cardDetail}>
              {item.category} · {item.brand}
            </Text>

            <View style={styles.cardDivider} />

            <Text style={styles.cardDetail}>
              Cantidad en inventario
            </Text>

            <Text style={styles.quantity}>
              {item.quantity} unidades
            </Text>

            <Text style={styles.price}>
              ${item.pricePerDay.toLocaleString('es-CO')} COP / día
            </Text>

            <Text style={styles.cardAction}>
              Ver detalles →
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={() =>
          !isLoading && !isError ? (
            <Text style={styles.message}>
              No se encontraron equipos.
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0718',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 22,
  },
  eyebrow: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#B8B3CC',
    fontSize: 14,
    marginTop: 7,
    lineHeight: 21,
  },
  primaryButton: {
    backgroundColor: '#D6A84F',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 15,
  },
  searchContainer: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 22,
  },
  searchInput: {
    color: '#FFFFFF',
    padding: 15,
    fontSize: 14,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  resultCount: {
    color: '#B8B3CC',
    fontSize: 12,
  },
  card: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    padding: 17,
    borderRadius: 16,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    lineHeight: 23,
  },
  statusBadge: {
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  availableBadge: {
    backgroundColor: '#123B43',
  },
  otherStatusBadge: {
    backgroundColor: '#352650',
  },
  status: {
    fontSize: 11,
    fontWeight: 'bold',
  },
  availableStatus: {
    color: '#22D3EE',
  },
  otherStatus: {
    color: '#D6A84F',
  },
  cardDetail: {
    color: '#B8B3CC',
    marginTop: 9,
    fontSize: 13,
  },
  cardDivider: {
    height: 1,
    backgroundColor: '#352650',
    marginVertical: 13,
  },
  quantity: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 4,
  },
  price: {
    color: '#22D3EE',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 14,
  },
  cardAction: {
    color: '#D6A84F',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 14,
  },
  message: {
    color: '#B8B3CC',
    textAlign: 'center',
    padding: 20,
  },
  error: {
    color: '#FF7777',
    marginBottom: 12,
  },
});


