
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
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.heading}>Equipos disponibles</Text>
      <Text style={styles.subtitle}>
        Sonido e iluminación para tus eventos
      </Text>

      <FlatList
        data={equipment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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

            <View style={styles.footer}>
              <View>
                <Text style={styles.priceLabel}>Precio por día</Text>
                <Text style={styles.price}>
                  ${item.pricePerDay.toLocaleString('es-CO')}
                </Text>
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
    marginBottom: 22,
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
  link: {
    color: '#C4B5FD',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
