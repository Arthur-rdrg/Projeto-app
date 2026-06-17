import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors } from '../../styles/theme';
import type { ShoppingItem } from '../../types';
import { formatMoney } from '../../utils/formatters';

type CheckViewProps = {
  items: ShoppingItem[];
  purchaseTotal: number;
};

export default function CheckView({ items, purchaseTotal }: CheckViewProps) {
  return (
    <View style={styles.checkScreen}>
      <View style={styles.greenTopBar}>
        <Text style={styles.topBarTitle}>Conferencia no caixa</Text>
      </View>

      <ScrollView contentContainerStyle={styles.checkContent}>
        <View style={styles.checkCard}>
          <Ionicons color={colors.green} name="receipt-outline" size={48} />
          <Text style={styles.emptyTitle}>Conferencia dos produtos</Text>
          <Text style={styles.emptyText}>
            Compare os valores abaixo com os valores cobrados no caixa.
          </Text>
        </View>

        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons color={colors.green} name="basket-outline" size={42} />
            <Text style={styles.emptyTitle}>Nenhum item para conferir</Text>
            <Text style={styles.emptyText}>Adicione produtos na lista antes de conferir.</Text>
          </View>
        ) : (
          items.map((item) => <CheckItem item={item} key={item.id} />)
        )}

        <View style={styles.checkTotalCard}>
          <Text style={styles.footerLabel}>Total esperado</Text>
          <Text style={styles.checkTotal}>{formatMoney(purchaseTotal)}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function CheckItem({ item }: { item: ShoppingItem }) {
  return (
    <View style={styles.checkItemCard}>
      <View style={styles.checkItemHeader}>
        <Text style={styles.checkItemName}>{item.name}</Text>
        <Text style={styles.checkItemTotal}>{formatMoney(item.total)}</Text>
      </View>

      <View style={styles.checkItemRow}>
        <View style={styles.checkPill}>
          <Text style={styles.checkPillLabel}>Unitario</Text>
          <Text style={styles.checkPillValue}>{formatMoney(item.unitPrice)}</Text>
        </View>

        <View style={styles.checkPill}>
          <Text style={styles.checkPillLabel}>Quantidade</Text>
          <Text style={styles.checkPillValue}>{item.quantity} unid.</Text>
        </View>
      </View>
    </View>
  );
}
