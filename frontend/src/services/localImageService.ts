import * as FileSystem from 'expo-file-system/legacy';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Platform } from 'react-native';

const productImagesDirectory = Platform.OS === 'web' ? '' : `${FileSystem.documentDirectory}product-images/`;

export async function prepareProductImage(imageUri: string) {
  return manipulateAsync(
    imageUri,
    [{ resize: { width: 900 } }],
    {
      compress: 0.65,
      format: SaveFormat.JPEG,
    },
  );
}

async function ensureProductImagesDirectory() {
  if (Platform.OS === 'web') return;
  const directoryInfo = await FileSystem.getInfoAsync(productImagesDirectory);

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(productImagesDirectory, {
      intermediates: true,
    });
  }
}

export async function saveProductImageLocally(imageUri: string) {
  if (Platform.OS === 'web') {
    try {
      const processedImage = await prepareProductImage(imageUri);
      return processedImage.uri;
    } catch (error) {
      console.warn('Erro ao processar imagem no web:', error);
      return imageUri;
    }
  }

  await ensureProductImagesDirectory();

  const processedImage = await prepareProductImage(imageUri);
  const localImageUri = `${productImagesDirectory}${Date.now()}.jpg`;

  await FileSystem.copyAsync({
    from: processedImage.uri,
    to: localImageUri,
  });

  return localImageUri;
}

export function getLocalImageErrorMessage() {
  return 'Nao foi possivel salvar a foto no celular. Tente tirar a foto novamente.';
}
