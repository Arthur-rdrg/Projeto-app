import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable, Text, View } from 'react-native';
import { itemCardStyles as styles } from '../styles/itemCardStyles';

export default function ItemCard({ item, onDecrease, onIncrease, onDelete }) {
  return (
    <View style={styles.card}>
      {item.imageUrl ? (
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Ionicons color="#0AB64F" name="bag-handle-outline" size={30} />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Unitario: R$ {Number(item.unitPrice).toFixed(2)}</Text>

        <View style={styles.quantityRow}>
          <Pressable onPress={onDecrease} style={({ pressed }) => [styles.smallButton, pressed && styles.pressed]}>
            <Ionicons color="#A0A7B2" name="remove" size={18} />
          </Pressable>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <Pressable onPress={onIncrease} style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
            <Ionicons color="#FFFFFF" name="add" size={18} />
          </Pressable>
        </View>
      </View>

      <View style={styles.side}>
        <Pressable onPress={onDelete} style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}>
          <Ionicons color="#E05A72" name="trash-outline" size={18} />
        </Pressable>
        <Text style={styles.total}>R$ {Number(item.total).toFixed(2)}</Text>
      </View>
    </View>
  );
}
