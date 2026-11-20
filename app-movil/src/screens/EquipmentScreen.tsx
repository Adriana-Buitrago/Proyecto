import { useEffect, useMemo, useState } from 'react';
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
import { getEquipment, createEquipment } from '../services/api';
import type { NewEquipment } from '../services/api';
import type { EquipmentItem } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;

export default function EquipmentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('Disponible');
  const [pricePerDay, setPricePerDay] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    async function loadEquipment() {
      try {
        const data = await getEquipment();
        setEquipment(data);
      } catch (err) {
        console.error('Error cargando equipos:', err);
        setError('No fue posible cargar los equipos.');
      } finally {
        setLoading(false);
      }
    }

    loadEquipment();
  }, []);

  const filteredEquipment = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return equipment;

    return equipment.filter((item) =>
      `${item.name} ${item.category} ${item.brand}`
        .toLocaleLowerCase()
        .includes(query)
    );
  }, [search, equipment]);

  function resetForm() {
    setName('');
    setCategory('');
    setBrand('');
    setQuantity('');
    setStatus('Disponible');
    setPricePerDay('');
    setDescription('');
    setFormError('');
  }

  async function handleCreate() {
    if (
      !name.trim() ||
      !category.trim() ||
      !brand.trim() ||
      !quantity.trim() ||
      !pricePerDay.trim() ||
      !description.trim()
    ) {
      setFormError('Completa todos los campos.');
      return;
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(pricePerDay);

    if (
      !Number.isInteger(parsedQuantity) ||
      parsedQuantity < 0 ||
      !Number.isInteger(parsedPrice) ||
      parsedPrice < 0
    ) {
      setFormError('La cantidad y el precio deben ser números enteros no negativos.');
      return;
    }

    const newEquipment: NewEquipment = {
      name: name.trim(),
      category: category.trim(),
      brand: brand.trim(),
      quantity: parsedQuantity,
      status: status.trim() || 'Disponible',
      pricePerDay: parsedPrice,
      description: description.trim(),
    };

    try {
      setSaving(true);
      setFormError('');

      const created = await createEquipment(newEquipment);

      setEquipment((current) => [created, ...current]);
      setSearch('');
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error('Error creando equipo:', err);
      setFormError(
        err instanceof Error
          ? err.message
          : 'No fue posible registrar el equipo.'
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={loading || error ? [] : filteredEquipment}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>Equipos</Text>
              <Text style={styles.subtitle}>
                Administra los equipos disponibles para tus eventos.
              </Text>
            </View>

            <Pressable
              style={styles.primaryButton}
              onPress={() => {
                setShowForm(!showForm);
                setFormError('');
              }}
            >
              <Text style={styles.primaryButtonText}>
                {showForm ? 'Cancelar registro' : '+ Crear equipo'}
              </Text>
            </Pressable>

            {showForm && (
              <View style={styles.form}>
                <Text style={styles.formTitle}>Registrar nuevo equipo</Text>

                <Text style={styles.fieldLabel}>Nombre</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Ej. Parlante profesional"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Categoría</Text>
                <TextInput
                  style={styles.input}
                  value={category}
                  onChangeText={setCategory}
                  placeholder="Ej. Audio"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Marca</Text>
                <TextInput
                  style={styles.input}
                  value={brand}
                  onChangeText={setBrand}
                  placeholder="Ej. Sony"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Cantidad</Text>
                <TextInput
                  style={styles.input}
                  value={quantity}
                  onChangeText={setQuantity}
                  keyboardType="numeric"
                  placeholder="Ej. 5"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Estado</Text>
                <TextInput
                  style={styles.input}
                  value={status}
                  onChangeText={setStatus}
                  placeholder="Disponible"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Precio por día (COP)</Text>
                <TextInput
                  style={styles.input}
                  value={pricePerDay}
                  onChangeText={setPricePerDay}
                  keyboardType="numeric"
                  placeholder="Ej. 50000"
                  placeholderTextColor="#777"
                />

                <Text style={styles.fieldLabel}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.descriptionInput]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  placeholder="Describe las características del equipo"
                  placeholderTextColor="#777"
                />

                {!!formError && (
                  <Text style={styles.formError}>{formError}</Text>
                )}

                <Pressable
                  style={[
                    styles.primaryButton,
                    saving && styles.disabledButton,
                  ]}
                  onPress={handleCreate}
                  disabled={saving}
                >
                  <Text style={styles.primaryButtonText}>
                    {saving ? 'Guardando...' : 'Guardar equipo'}
                  </Text>
                </Pressable>
              </View>
            )}

            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Buscar equipos..."
              placeholderTextColor="#777"
            />

            <Text style={styles.resultCount}>
              {filteredEquipment.length} equipos registrados
            </Text>

            {loading && <Text style={styles.message}>Cargando equipos...</Text>}
            {!!error && <Text style={styles.error}>{error}</Text>}
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
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <Text style={styles.cardDetail}>
              {item.category} · {item.brand}
            </Text>
            <Text style={styles.cardDetail}>
              Cantidad: {item.quantity}
            </Text>
            <Text style={styles.price}>
              ${item.pricePerDay.toLocaleString('es-CO')} / día
            </Text>
          </Pressable>
        )}
        ListEmptyComponent={() =>
          !loading && !error ? (
            <Text style={styles.message}>No se encontraron equipos.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101114',
  },
  listContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A5A5A5',
    fontSize: 14,
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: '#D6A84F',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonText: {
    color: '#101114',
    fontWeight: 'bold',
    fontSize: 15,
  },
  disabledButton: {
    opacity: 0.6,
  },
  form: {
    backgroundColor: '#1B1D22',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  fieldLabel: {
    color: '#E5E5E5',
    fontSize: 13,
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#292C32',
    color: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
    fontSize: 14,
  },
  descriptionInput: {
    minHeight: 85,
    textAlignVertical: 'top',
  },
  formError: {
    color: '#FF7777',
    marginVertical: 12,
  },
  searchInput: {
    backgroundColor: '#25272D',
    color: '#FFFFFF',
    borderRadius: 10,
    padding: 13,
    marginTop: 4,
    marginBottom: 14,
  },
  resultCount: {
    color: '#AAAAAA',
    marginBottom: 12,
    fontSize: 13,
  },
  card: {
    backgroundColor: '#1B1D22',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  status: {
    color: '#D6A84F',
    fontSize: 12,
  },
  cardDetail: {
    color: '#AAAAAA',
    marginTop: 7,
    fontSize: 13,
  },
  price: {
    color: '#D6A84F',
    fontWeight: 'bold',
    marginTop: 10,
  },
  message: {
    color: '#AAAAAA',
    textAlign: 'center',
    padding: 20,
  },
  error: {
    color: '#FF7777',
    marginBottom: 12,
  },
});
