
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedStore } from '../store/savedStore';

export default function SavedScreen() {
  const savedItems = useSavedStore((state) => state.savedItems);
  const removeItem = useSavedStore((state) => state.removeItem);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <Text style={styles.eyebrow}>DJ SONIDO Y LUCES</Text>
      <Text style={styles.title}>Mis equipos guardados</Text>

      {savedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            No tienes equipos guardados
          </Text>
          <Text style={styles.emptyText}>
            Explora nuestro catálogo y guarda tus equipos favoritos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={savedItems}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.info}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>
                  {item.description}
                </Text>
              </View>

              <Pressable
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.removeButtonText}>Quitar</Text>
              </Pressable>
            </View>
          )}
        />
      )}
    </SafeAreaView>
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
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 24,
    gap: 14,
  },
  card: {
    backgroundColor: '#17112B',
    borderColor: '#352650',
    borderWidth: 1,
    padding: 16,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: '#B8B3CC',
    lineHeight: 21,
  },
  removeButton: {
    backgroundColor: '#352044',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 9,
  },
  removeButtonText: {
    color: '#FCA5A5',
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#B8B3CC',
    textAlign: 'center',
    lineHeight: 22,
  },
});
