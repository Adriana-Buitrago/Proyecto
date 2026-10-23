import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Equipment } from '../types';
import { COLORS, RADII, SPACING, TYPOGRAPHY } from '../theme';

type ItemCardProps = {
  item: Equipment;
  onPress: (item: Equipment) => void;
};

export default function ItemCard({ item, onPress }: ItemCardProps) {
  const statusColor = item.status === 'Disponible'
    ? COLORS.success
    : item.status === 'Reservado'
      ? COLORS.warning
      : COLORS.danger;

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
    >
      <View style={styles.topRow}>
        <View style={styles.iconCircle}>
          <Text style={styles.iconText}>{item.category === 'Sonido' ? '♫' : item.category === 'Iluminación' ? '✦' : '⌁'}</Text>
        </View>
        <View style={styles.mainInfo}>
          <Text style={styles.category}>{item.category.toUpperCase()}</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
        </View>
        <View style={[styles.statusPill, { borderColor: statusColor }]}>
          <Text style={[styles.statusText, { color: statusColor }]}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
        <Text style={styles.details}>Ver detalle →</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADII.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.lg,
    gap: SPACING.md
  },
  pressed: { opacity: 0.78 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.surfaceRaised,
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconText: { color: COLORS.accent, fontSize: 24, fontWeight: '800' },
  mainInfo: { flex: 1, gap: 3 },
  category: { color: COLORS.accent, fontSize: TYPOGRAPHY.label, fontWeight: '800', letterSpacing: 1 },
  name: { color: COLORS.text, fontSize: TYPOGRAPHY.cardTitle, fontWeight: '800' },
  brand: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.caption },
  statusPill: { borderWidth: 1, borderRadius: RADII.pill, paddingHorizontal: SPACING.sm, paddingVertical: SPACING.xs },
  statusText: { fontSize: 10, fontWeight: '700' },
  description: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.body, lineHeight: 20 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quantity: { color: COLORS.textSecondary, fontSize: TYPOGRAPHY.caption },
  details: { color: COLORS.accentSecondary, fontSize: TYPOGRAPHY.caption, fontWeight: '800' }
});
