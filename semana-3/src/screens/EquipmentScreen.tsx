import { useMemo, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { equipment } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

export default function EquipmentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState('');

  const filteredEquipment = useMemo(() => {
    const query = search.trim().toLocaleLowerCase();

    if (!query) return equipment;

    return equipment.filter((item) =>
      [
        item.name,
        item.category,
        item.brand,
        item.status,
        item.description,
      ].some((value) => value.toLocaleLowerCase().includes(query)),
    );
  }, [search]);

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.heading}>Catálogo de equipos</Text>
      <Text style={styles.subtitle}>
        Sonido e iluminación para tus eventos
      </Text>

      <TextInput
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar por nombre, marca o categoría..."
        placeholderTextColor="#8E87A6"
        autoCapitalize="none"
        returnKeyType="search"
        accessibilityLabel="Buscar equipos"
      />

      <Text style={styles.resultCount}>
        {filteredEquipment.length}{' '}
        {filteredEquipment.length === 1
          ? 'equipo encontrado'
          : 'equipos encontrados'}
      </Text>

      <FlatList
        data={filteredEquipment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No encontramos equipos</Text>
            <Text style={styles.info}>
              Prueba con otro nombre, marca, categoría o estado.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              navigation.navigate('EquipmentDetail', {
                equipmentId: item.id,
              })
            }
          >
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>{item.description}</Text>

            <View style={styles.metadata}>
              <Text style={styles.metadataText}>Marca: {item.brand}</Text>
              <Text style={styles.metadataText}>Cantidad: {item.quantity}</Text>
              <Text style={styles.statusText}>Estado: {item.status}</Text>
            </View>

            <View style={styles.footer}>
              <View>
                <Text style={styles.priceLabel}>Alquiler por día</Text>
                <Text style={styles.price}>
                  ${item.pricePerDay.toLocaleString('es-CO')}
                </Text>
                <Text style={styles.currency}>COP · Tarifa ilustrativa</Text>
              </View>

              <Text style={styles.link}>Ver detalles →</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0718',
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  eyebrow: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#B8B3CC',
    marginTop: 6,
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
  },
  resultCount: {
    color: '#22D3EE',
    fontSize: 12,
    marginBottom: 12,
    fontWeight: '600',
  },
  list: {
    gap: 14,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 18,
    padding: 17,
  },
  cardPressed: {
    opacity: 0.8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#292044',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 12,
  },
  categoryText: {
    color: '#22D3EE',
    fontSize: 12,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  info: {
    fontSize: 14,
    lineHeight: 21,
    color: '#B8B3CC',
    marginTop: 8,
  },
  metadata: {
    marginTop: 12,
    gap: 5,
  },
  metadataText: {
    color: '#B8B3CC',
    fontSize: 13,
  },
  statusText: {
    color: '#22D3EE',
    fontSize: 13,
    fontWeight: '600',
  },
  footer: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#352650',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  priceLabel: {
    color: '#B8B3CC',
    fontSize: 12,
  },
  price: {
    color: '#22D3EE',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  currency: {
    color: '#8E87A6',
    fontSize: 10,
    marginTop: 3,
  },
  link: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: 'bold',
  },
  empty: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
