import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { events } from '../data/mockData';
import type { RootStackParamList } from '../types/navigation';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainTabs'
>;

export default function EventsScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.heading}>Próximos eventos</Text>
      <Text style={styles.subtitle}>
        Sonido, música e iluminación para cada celebración
      </Text>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
            onPress={() =>
              navigation.navigate('EventDetail', {
                eventId: item.id,
              })
            }
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.eventImage}
              resizeMode="cover"
              accessibilityLabel={`Imagen de ${item.name}`}
            />

            <View style={styles.cardContent}>
              <View style={styles.eventHeader}>
                <Text style={styles.eventNumber}>
                  EVENTO {String(index + 1).padStart(2, '0')}
                </Text>
                <Text style={styles.arrow}>↗</Text>
              </View>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.info}>📅  {item.date}</Text>
              <Text style={styles.info}>📍  {item.location}</Text>

              <View style={styles.footer}>
                <Text style={styles.link}>Ver detalles</Text>
                <Text style={styles.link}>→</Text>
              </View>
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
    lineHeight: 21,
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
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.8,
  },
  eventImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#292044',
  },
  cardContent: {
    padding: 17,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  eventNumber: {
    color: '#22D3EE',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  arrow: {
    color: '#22D3EE',
    fontSize: 20,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  info: {
    fontSize: 14,
    lineHeight: 22,
    color: '#B8B3CC',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#352650',
  },
  link: {
    color: '#22D3EE',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
