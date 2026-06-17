import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Image,
  Text,
  TextInput,
  View,
} from 'react-native';
import ItemCard from '../ItemCard';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors } from '../../styles/theme';
import { formatMoney } from '../../utils/formatters';

export default function ListView({
  errorMessage,
  form,
  handleAddItem,
  handleChangeQuantity,
  handleDeleteItem,
  isFormOpen,
  isLoading,
  isSaving,
  items,
  purchaseTotal,
  setIsCameraOpen,
  setIsFormOpen,
  updateForm,
}) {
  return (
    <View style={styles.listScreen}>
      <View style={styles.greenTopBar}>
        <Text style={styles.topBarTitle}>Minha Lista de Compras</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{items.length}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.listContent} keyboardShouldPersistTaps="handled">
        {isFormOpen ? (
          <ProductForm
            errorMessage={errorMessage}
            form={form}
            handleAddItem={handleAddItem}
            isSaving={isSaving}
            setIsCameraOpen={setIsCameraOpen}
            updateForm={updateForm}
          />
        ) : null}

        <ItemList
          handleChangeQuantity={handleChangeQuantity}
          handleDeleteItem={handleDeleteItem}
          isLoading={isLoading}
          items={items}
        />
      </ScrollView>

      <View style={styles.totalFooter}>
        <View>
          <Text style={styles.footerLabel}>Total geral</Text>
          <Text style={styles.footerTotal}>{formatMoney(purchaseTotal)}</Text>
        </View>
        <Pressable
          onPress={() => setIsFormOpen((currentValue) => !currentValue)}
          style={({ pressed }) => [styles.floatingAddButton, pressed && styles.pressed]}
        >
          <Ionicons color={colors.white} name={isFormOpen ? 'close' : 'add'} size={30} />
        </Pressable>
      </View>
    </View>
  );
}

function ProductForm({
  errorMessage,
  form,
  handleAddItem,
  isSaving,
  setIsCameraOpen,
  updateForm,
}) {
  return (
    <View style={styles.formCard}>
      <Text style={styles.formTitle}>Adicionar produto</Text>

      <Text style={styles.label}>Foto do produto</Text>
      {form.imageUri ? (
        <View style={styles.photoPreviewBox}>
          <Image source={{ uri: form.imageUri }} style={styles.photoPreview} />
          <View style={styles.photoActions}>
            <Pressable
              onPress={() => setIsCameraOpen(true)}
              style={({ pressed }) => [styles.photoActionButton, pressed && styles.pressed]}
            >
              <Ionicons color={colors.green} name="camera-outline" size={18} />
              <Text style={styles.photoActionText}>Trocar foto</Text>
            </Pressable>
            <Pressable
              onPress={() => updateForm('imageUri', '')}
              style={({ pressed }) => [styles.photoRemoveButton, pressed && styles.pressed]}
            >
              <Ionicons color={colors.dangerSoft} name="trash-outline" size={18} />
            </Pressable>
          </View>
        </View>
      ) : (
        <Pressable
          onPress={() => setIsCameraOpen(true)}
          style={({ pressed }) => [styles.photoButton, pressed && styles.pressed]}
        >
          <Ionicons color={colors.green} name="camera-outline" size={24} />
          <Text style={styles.photoButtonText}>Tirar foto do produto</Text>
        </Pressable>
      )}

      <Text style={styles.label}>Nome do produto</Text>
      <TextInput
        onChangeText={(value) => updateForm('name', value)}
        placeholder="Ex: Arroz 5kg"
        placeholderTextColor={colors.mutedLight}
        style={styles.input}
        value={form.name}
      />

      <View style={styles.row}>
        <View style={styles.field}>
          <Text style={styles.label}>Valor unitario</Text>
          <TextInput
            keyboardType="decimal-pad"
            onChangeText={(value) => updateForm('unitPrice', value)}
            placeholder="25,90"
            placeholderTextColor={colors.mutedLight}
            style={styles.input}
            value={form.unitPrice}
          />
        </View>

        <View style={styles.quantityField}>
          <Text style={styles.label}>Qtd.</Text>
          <TextInput
            keyboardType="number-pad"
            onChangeText={(value) => updateForm('quantity', value)}
            placeholder="1"
            placeholderTextColor={colors.mutedLight}
            style={styles.input}
            value={form.quantity}
          />
        </View>
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <Pressable
        disabled={isSaving}
        onPress={handleAddItem}
        style={({ pressed }) => [
          styles.primaryAction,
          pressed && styles.pressed,
          isSaving && styles.disabledButton,
        ]}
      >
        {isSaving ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <>
            <Ionicons color={colors.white} name="add" size={22} />
            <Text style={styles.primaryActionText}>Salvar produto</Text>
          </>
        )}
      </Pressable>
    </View>
  );
}

function ItemList({ handleChangeQuantity, handleDeleteItem, isLoading, items }) {
  if (isLoading) {
    return <ActivityIndicator color={colors.green} />;
  }

  if (items.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons color={colors.green} name="basket-outline" size={42} />
        <Text style={styles.emptyTitle}>Nenhum produto cadastrado</Text>
        <Text style={styles.emptyText}>Toque no botao + para adicionar o primeiro item.</Text>
      </View>
    );
  }

  return items.map((item) => (
    <ItemCard
      item={item}
      key={item.id}
      onDecrease={() => handleChangeQuantity(item, Number(item.quantity) - 1)}
      onDelete={() => handleDeleteItem(item.id)}
      onIncrease={() => handleChangeQuantity(item, Number(item.quantity) + 1)}
    />
  ));
}
