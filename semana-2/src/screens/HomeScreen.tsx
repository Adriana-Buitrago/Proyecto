import React, { useCallback, useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { equipment } from '../data/mockData';
import ItemCard from '../components/ItemCard';
import type { Equipment } from '../types';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '../theme';

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [equipmentItems, setEquipmentItems] = useState<Equipment[]>(equipment);

  const filteredEquipment = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    if (!normalizedQuery) return equipmentItems;

    return equipmentItems.filter((item) =>
      [item.name, item.category, item.brand, item.status, item.description]
        .some((value) => value.toLocaleLowerCase().includes(normalizedQuery))
    );
  }, [equipmentItems, query]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setEquipmentItems([...equipment]);
      setRefreshing(false);
    }, 900);
  }, []);

  const handleEquipmentPress = useCallback((item: Equipment) => {
    Alert.alert(
      item.name,
      `Categoría: ${item.category}\nMarca: ${item.brand}\nCantidad: ${item.quantity}\nEstado: ${item.status}\n\n${item.description}`
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: Equipment }) => (
    <ItemCard item={item} onPress={handleEquipmentPress} />
  ), [handleEquipmentPress]);

  const renderEmpty = useCallback(() => (
    <View style={styles.empty}>
      <Text style={styles.emptyIcon}>⌕</Text>
      <Text style={styles.emptyTitle}>No encontramos equipos</Text>
      <Text style={styles.emptyText}>Prueba con otro nombre, marca, categoría o estado.</Text>
      {query.length > 0 && (
        <Pressable onPress={() => setQuery('')} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Limpiar búsqueda</Text>
        </Pressable>
      )}
    </View>
  ), [query]);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.eyebrow}>INVENTARIO PROFESIONAL</Text>
            <Text style={styles.title}>DJ / Sonido y Luces</Text>
            <Text style={styles.subtitle}>Consulta equipos y disponibilidad para tus eventos.</Text>
            <View style={styles.counterRow}>
              <View style={styles.counter}>
                <Text style={styles.counterNumber}>{equipmentItems.length}</Text>
                <Text style={styles.counterLabel}>Equipos</Text>
              </View>
              <View style={styles.counter}>
                <Text style={styles.counterNumber}>{equipmentItems.filter((item) => item.status === 'Disponible').length}</Text>
                <Text style={styles.counterLabel}>Disponibles</Text>
              </View>
              <View style={styles.counter}>
                <Text style={styles.counterNumber}>{equipmentItems.filter((item) => item.status === 'Reservado').length}</Text>
                <Text style={styles.counterLabel}>Reservados</Text>
              </View>
            </View>
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Buscar equipo, marca, categoría..."
              placeholderTextColor={COLORS.textSecondary}
              returnKeyType="search"
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              style={styles.input}
              accessibilityLabel="Buscar equipos"
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery('')} style={styles.clearSearch}>
                <Text style={styles.clearSearchText}>Borrar búsqueda</Text>
              </Pressable>
            )}
          </View>

          <FlatList
            data={filteredEquipment}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={
              <Text style={styles.listHeading}>
                {query ? `Resultados (${filteredEquipment.length})` : 'Inventario de equipos'}
              </Text>
            }
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  screen: { flex: 1, backgroundColor: COLORS.background },
  header: { paddingHorizontal: SPACING.lg, paddingTop: 50, paddingBottom: SPACING.md },
  eyebrow: { color: COLORS.accent, fontSize: TYPOGRAPHY.label, fontWeight: '800', letterSpacing: 1.5 },
  title: { color: COLORS.text, fontSize: TYPOGRAPHY.title, fontWeight: '900', marginTop: SPACING.sm },
  subtitle: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.body, lineHeight: 21, marginTop: SPACING.xs },
  counterRow: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.lg, marginBottom: SPACING.lg },
  counter: { flex: 1, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, borderRadius: RADII.input, padding: SPACING.md },
  counterNumber: { color: COLORS.text, fontSize: 20, fontWeight: '900' },
  counterLabel: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.caption, marginTop: 2 },
  input: { backgroundColor: COLORS.surface, color: COLORS.text, borderColor: COLORS.border, borderWidth: 1, borderRadius: RADII.input, paddingHorizontal: SPACING.lg, paddingVertical: 13, fontSize: TYPOGRAPHY.body },
  clearSearch: { alignSelf: 'flex-end', paddingTop: SPACING.sm, paddingRight: SPACING.xs },
  clearSearchText: { color: COLORS.accentSecondary, fontWeight: '700', fontSize: TYPOGRAPHY.caption },
  listContent: { paddingHorizontal: SPACING.lg, paddingBottom: SPACING.xxl, flexGrow: 1 },
  listHeading: { color: COLORS.text, fontSize: 17, fontWeight: '800', marginTop: SPACING.md, marginBottom: SPACING.md },
  separator: { height: SPACING.md },
  empty: { alignItems: 'center', padding: SPACING.xxl, gap: SPACING.sm },
  emptyIcon: { color: COLORS.accentSecondary, fontSize: 38 },
  emptyTitle: { color: COLORS.text, fontSize: 17, fontWeight: '800', textAlign: 'center' },
  emptyText: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.body, textAlign: 'center', lineHeight: 20 },
  clearButton: { backgroundColor: COLORS.surfaceRaised, borderRadius: RADII.input, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.md, marginTop: SPACING.sm },
  clearButtonText: { color: COLORS.accent, fontWeight: '800' }
});
