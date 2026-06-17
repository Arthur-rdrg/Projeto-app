import { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomTabs from '../components/shopping/BottomTabs';
import CameraCapture from '../components/shopping/CameraCapture';
import CheckView from '../components/shopping/CheckView';
import HomeView from '../components/shopping/HomeView';
import ListView from '../components/shopping/ListView';
import {
  addShoppingItem,
  deleteShoppingItem,
  getFirestoreErrorMessage,
  updateItemQuantity,
  watchUserItems,
} from '../services/itemService';
import {
  getLocalImageErrorMessage,
  saveProductImageLocally,
} from '../services/localImageService';
import { shoppingStyles as styles } from '../styles/shoppingStyles';
import { parseMoney, sumItemQuantities, sumItemTotals } from '../utils/formatters';

const initialForm = {
  imageUri: '',
  name: '',
  quantity: '1',
  unitPrice: '',
};

export default function ShoppingListScreen({ user }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = watchUserItems(
      user.uid,
      (nextItems) => {
        setItems(nextItems);
        setIsLoading(false);
      },
      () => {
        setErrorMessage('Nao foi possivel carregar os itens.');
        setIsLoading(false);
      },
    );

    return unsubscribe;
  }, [user.uid]);

  const purchaseTotal = useMemo(() => sumItemTotals(items), [items]);
  const unitsTotal = useMemo(() => sumItemQuantities(items), [items]);

  function updateForm(field, value) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  }

  function openAddForm() {
    setActiveTab('list');
    setIsFormOpen(true);
  }

  async function handleAddItem() {
    setErrorMessage('');

    const parsedUnitPrice = parseMoney(form.unitPrice);
    const parsedQuantity = Number(form.quantity);

    if (!form.name.trim()) {
      setErrorMessage('Digite o nome do produto.');
      return;
    }

    if (!form.imageUri) {
      setErrorMessage('Tire uma foto do produto.');
      return;
    }

    if (!Number.isFinite(parsedUnitPrice) || parsedUnitPrice <= 0) {
      setErrorMessage('Digite um valor unitario valido.');
      return;
    }

    if (!Number.isInteger(parsedQuantity) || parsedQuantity <= 0) {
      setErrorMessage('Digite uma quantidade valida.');
      return;
    }

    try {
      setIsSaving(true);
      let imageUrl = '';

      try {
        imageUrl = await saveProductImageLocally(form.imageUri);
      } catch (error) {
        console.log('Erro ao salvar imagem local:', error);
        setErrorMessage(getLocalImageErrorMessage(error));
        return;
      }

      await addShoppingItem(user.uid, {
        imageUrl,
        name: form.name,
        quantity: parsedQuantity,
        unitPrice: parsedUnitPrice,
      });
      setForm(initialForm);
      setIsFormOpen(false);
      setActiveTab('list');
    } catch (error) {
      console.log('Erro ao salvar item:', error);
      setErrorMessage(getFirestoreErrorMessage(error));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleChangeQuantity(item, nextQuantity) {
    try {
      await updateItemQuantity(user.uid, item, nextQuantity);
    } catch (error) {
      setErrorMessage('Nao foi possivel alterar a quantidade.');
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteShoppingItem(user.uid, itemId);
    } catch (error) {
      setErrorMessage('Nao foi possivel excluir o produto.');
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {isCameraOpen ? (
          <CameraCapture
            onCancel={() => setIsCameraOpen(false)}
            onPhotoTaken={(imageUri) => {
              updateForm('imageUri', imageUri);
              setIsCameraOpen(false);
              setIsFormOpen(true);
              setActiveTab('list');
            }}
          />
        ) : activeTab === 'home' ? (
          <HomeView
            itemCount={items.length}
            onOpenAddForm={openAddForm}
            onOpenCheck={() => setActiveTab('check')}
            onOpenList={() => setActiveTab('list')}
            purchaseTotal={purchaseTotal}
            unitsTotal={unitsTotal}
            user={user}
          />
        ) : activeTab === 'list' ? (
          <ListView
            errorMessage={errorMessage}
            form={form}
            handleAddItem={handleAddItem}
            handleChangeQuantity={handleChangeQuantity}
            handleDeleteItem={handleDeleteItem}
            isFormOpen={isFormOpen}
            isLoading={isLoading}
            isSaving={isSaving}
            items={items}
            purchaseTotal={purchaseTotal}
            setIsFormOpen={setIsFormOpen}
            setIsCameraOpen={setIsCameraOpen}
            updateForm={updateForm}
          />
        ) : (
          <CheckView items={items} purchaseTotal={purchaseTotal} />
        )}

        {isCameraOpen ? null : <BottomTabs activeTab={activeTab} setActiveTab={setActiveTab} />}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
