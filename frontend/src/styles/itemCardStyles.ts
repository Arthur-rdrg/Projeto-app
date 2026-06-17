import { StyleSheet } from 'react-native';
import { colors, shadows } from './theme';

export const itemCardStyles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: 16,
    flexDirection: 'row',
    gap: 12,
    minHeight: 118,
    padding: 14,
    ...shadows.card,
  },
  imagePlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.greenTint,
    borderRadius: 14,
    height: 66,
    justifyContent: 'center',
    width: 66,
  },
  productImage: {
    backgroundColor: colors.greenTint,
    borderRadius: 14,
    height: 66,
    width: 66,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  detail: {
    color: '#9AA1AD',
    fontSize: 13,
  },
  quantityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    marginTop: 6,
  },
  smallButton: {
    alignItems: 'center',
    backgroundColor: '#F1F3F6',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  quantity: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  side: {
    alignItems: 'flex-end',
    gap: 24,
  },
  deleteButton: {
    alignItems: 'center',
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  total: {
    color: colors.greenDark,
    fontSize: 15,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.8,
  },
});
