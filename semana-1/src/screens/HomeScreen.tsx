import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { events } from '../data/mockData';
import ItemCard from '../components/ItemCard';
import type { EventItem } from '../types';

export default function HomeScreen() {
  const handleEventPress = (item: EventItem) => {
    Alert.alert(
      item.name,
      `${item.eventType}\nFecha: ${item.date}\nLugar: ${item.location}\nDuración: ${item.durationHours} horas`
    );
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>EXPERIENCIAS QUE SUENAN</Text>
        <Text style={styles.title}>DJ / Sonido y Luces</Text>
        <Text style={styles.subtitle}>Eventos destacados y servicios para cada celebración.</Text>
      </View>
      {events.map((item) => (
        <ItemCard key={item.id} item={item} onPress={handleEventPress} />
      ))}
      <Text style={styles.footer}>Sonido potente · Iluminación · Momentos inolvidables</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#0B0B14' },
  container: { padding: 18, paddingTop: 54, paddingBottom: 32 },
  header: { marginBottom: 24, gap: 8 },
  eyebrow: { color: '#6EE7F9', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: '#FFFFFF', fontSize: 28, fontWeight: '900' },
  subtitle: { color: '#B7B7D2', fontSize: 15, lineHeight: 22 },
  footer: { color: '#777791', textAlign: 'center', fontSize: 12, marginTop: 8 }
});
