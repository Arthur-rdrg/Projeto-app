import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View, TextInput, StyleSheet } from 'react-native';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors, shadows } from '../../styles/theme';
import type { ShoppingItem } from '../../types';
import { formatMoney, parseMoney } from '../../utils/formatters';

type CheckViewProps = {
  items: ShoppingItem[];
  purchaseTotal: number;
};

export default function CheckView({ items, purchaseTotal }: CheckViewProps) {
  const [manualTotalStr, setManualTotalStr] = useState('');

  const manualTotal = parseMoney(manualTotalStr) || 0;
  const difference = manualTotal - purchaseTotal;

  let resultIcon = 'checkmark-circle-outline';
  let resultTextColor = '#1E7F54';
  let resultBgColor = '#EBFBEE';
  let resultTitle = 'Os valores batem perfeitamente!';

  if (manualTotalStr.trim() !== '') {
    if (Math.abs(difference) < 0.01) {
      resultIcon = 'checkmark-circle-outline';
      resultTextColor = '#1E7F54';
      resultBgColor = '#EBFBEE';
      resultTitle = 'Os valores batem perfeitamente!';
    } else if (difference > 0) {
      resultIcon = 'warning-outline';
      resultTextColor = '#D97706';
      resultBgColor = '#FEF3C7';
      resultTitle = 'O caixa cobrou a mais!';
    } else {
      resultIcon = 'information-circle-outline';
      resultTextColor = '#2563EB';
      resultBgColor = '#EFF6FF';
      resultTitle = 'O caixa cobrou a menos!';
    }
  }

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

        {items.length > 0 && (
          <View style={localStyles.comparisonCard}>
            <Text style={localStyles.cardTitle}>Comparar com o Caixa</Text>
            <Text style={localStyles.cardSubtitle}>
              Digite o valor cobrado pelo caixa do supermercado para comparar com o total planejado:
            </Text>

            <View style={localStyles.inputContainer}>
              <Text style={localStyles.currencySymbol}>R$</Text>
              <TextInput
                style={localStyles.input}
                placeholder="0,00"
                placeholderTextColor={colors.mutedLight}
                keyboardType="numeric"
                value={manualTotalStr}
                onChangeText={setManualTotalStr}
              />
            </View>

            <View style={localStyles.sideBySide}>
              <View style={localStyles.valueBox}>
                <Text style={localStyles.valueBoxLabel}>TOTAL DA LISTA</Text>
                <Text style={localStyles.valueBoxPrice}>{formatMoney(purchaseTotal)}</Text>
              </View>
              <View style={localStyles.valueBox}>
                <Text style={localStyles.valueBoxLabel}>TOTAL DIGITADO</Text>
                <Text style={localStyles.valueBoxPrice}>
                  {manualTotalStr.trim() !== '' ? formatMoney(manualTotal) : 'R$ 0,00'}
                </Text>
              </View>
            </View>

            {manualTotalStr.trim() !== '' && (
              <View style={[localStyles.resultBox, { backgroundColor: resultBgColor }]}>
                <Ionicons name={resultIcon as any} size={24} color={resultTextColor} />
                <View style={localStyles.resultTextContainer}>
                  <Text style={[localStyles.resultTitle, { color: resultTextColor }]}>
                    {resultTitle}
                  </Text>
                  <Text style={[localStyles.resultDiff, { color: resultTextColor }]}>
                    Diferenca: {formatMoney(Math.abs(difference))}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}

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

const localStyles = StyleSheet.create({
  comparisonCard: {
    backgroundColor: colors.panel,
    borderRadius: 16,
    padding: 20,
    gap: 12,
    ...shadows.card,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: colors.textSoft,
    fontSize: 14,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panelSoft,
    borderColor: '#E1E5EA',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    minHeight: 50,
  },
  currencySymbol: {
    color: colors.muted,
    fontSize: 16,
    fontWeight: '700',
    marginRight: 6,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
    height: '100%',
  },
  sideBySide: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  valueBox: {
    flex: 1,
    backgroundColor: colors.panelSoft,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  valueBoxLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: '700',
  },
  valueBoxPrice: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '800',
    marginTop: 4,
  },
  resultBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 14,
    gap: 12,
    marginTop: 4,
  },
  resultTextContainer: {
    flex: 1,
    gap: 2,
  },
  resultTitle: {
    fontSize: 15,
    fontWeight: '800',
  },
  resultDiff: {
    fontSize: 13,
    fontWeight: '600',
  },
});

function CheckItem({ item }: { item: ShoppingItem }) {
  return (
    <View style={styles.checkItemCard}>
      <View style={styles.checkItemHeader}>
        <Text style={styles.checkItemName}>{item.name}</Text>
        <Text style={styles.checkItemTotal}>{formatMoney(Number(item.unitPrice || 0) * Number(item.quantity || 0))}</Text>
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
