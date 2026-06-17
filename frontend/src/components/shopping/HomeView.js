import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { logout } from '../../services/authService';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors } from '../../styles/theme';
import { formatMoney, getFirstName } from '../../utils/formatters';

export default function HomeView({
  itemCount,
  onOpenAddForm,
  onOpenCheck,
  onOpenList,
  purchaseTotal,
  unitsTotal,
  user,
}) {
  return (
    <ScrollView contentContainerStyle={styles.homeContent}>
      <View style={styles.homeHeader}>
        <View>
          <Text style={styles.welcome}>Bem-vinda,</Text>
          <Text style={styles.userName}>{getFirstName(user)}</Text>
        </View>

        <Pressable onPress={logout} style={({ pressed }) => [styles.headerIconButton, pressed && styles.pressed]}>
          <Ionicons color={colors.white} name="log-out-outline" size={22} />
        </Pressable>
      </View>

      <View style={styles.summaryCard}>
        <View>
          <Text style={styles.summaryLabel}>TOTAL DA COMPRA</Text>
          <Text style={styles.summaryValue}>{formatMoney(purchaseTotal)}</Text>
        </View>
        <View style={styles.cartBadge}>
          <Ionicons color={colors.green} name="cart-outline" size={34} />
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <Ionicons color={colors.green} name="list-outline" size={24} />
          <View>
            <Text style={styles.statLabel}>Produtos</Text>
            <Text style={styles.statValue}>{itemCount}</Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Ionicons color={colors.green} name="bag-handle-outline" size={24} />
          <View>
            <Text style={styles.statLabel}>Unidades</Text>
            <Text style={styles.statValue}>{unitsTotal}</Text>
          </View>
        </View>
      </View>

      <Text style={styles.quickTitle}>ACOES RAPIDAS</Text>
      <Pressable onPress={onOpenAddForm} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}>
        <Ionicons color={colors.white} name="camera-outline" size={22} />
        <Text style={styles.primaryActionText}>Adicionar produto</Text>
      </Pressable>
      <Pressable onPress={onOpenList} style={({ pressed }) => [styles.outlineAction, pressed && styles.pressed]}>
        <Ionicons color={colors.greenText} name="list-outline" size={22} />
        <Text style={styles.outlineActionText}>Minha lista</Text>
      </Pressable>
      <Pressable onPress={onOpenCheck} style={({ pressed }) => [styles.lightAction, pressed && styles.pressed]}>
        <Ionicons color={colors.greenText} name="checkmark" size={22} />
        <Text style={styles.lightActionText}>Conferencia no caixa</Text>
      </Pressable>
    </ScrollView>
  );
}
