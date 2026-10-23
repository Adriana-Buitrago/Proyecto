
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
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

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Equipos disponibles</Text>
      <Text style={styles.subtitle}>
        Sonido e iluminación para tus eventos
      </Text>

      <FlatList
        data={equipment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate('EquipmentDetail', {
                equipmentId: item.id,
              })
            }
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.info}>Categoría: {item.category}</Text>
            <Text style={styles.info}>
              Precio por día: ${item.pricePerDay.toLocaleString('es-CO')}
            </Text>
            <Text style={styles.link}>Ver detalles →</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F3FF',
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B21B6',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 16,
  },
  list: {
    gap: 12,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  info: {
    fontSize: 14,
    color: '#475569',
    marginTop: 8,
  },
  link: {
    color: '#7C3AED',
    fontWeight: 'bold',
    marginTop: 12,
  },
});
