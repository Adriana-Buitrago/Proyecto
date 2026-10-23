import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { EventItem } from '../types';

type ItemCardProps = {
  item: EventItem;
  onPress: (item: EventItem) => void;
};

export default function ItemCard({ item, onPress }: ItemCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.eventType}>{item.eventType.toUpperCase()}</Text>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>{item.date} · {item.durationHours} horas</Text>
        <Text style={styles.location}>{item.location}</Text>
        <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
        <Text style={styles.action}>Ver detalles →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#17172A',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#30304B'
  },
  cardPressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
  image: { width: '100%', height: 160, backgroundColor: '#292943' },
  content: { padding: 16, gap: 7 },
  eventType: { color: '#6EE7F9', fontSize: 11, fontWeight: '800', letterSpacing: 1.2 },
  name: { color: '#FFFFFF', fontSize: 19, fontWeight: '800' },
  details: { color: '#D4D4E8', fontSize: 13 },
  location: { color: '#B7B7D2', fontSize: 13 },
  description: { color: '#E3E3F0', fontSize: 14, lineHeight: 20 },
  action: { color: '#C4B5FD', fontSize: 14, fontWeight: '700', marginTop: 4 }
});
