import * as FileSystem from 'expo-file-system/legacy';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';

const productImagesDirectory = `${FileSystem.documentDirectory}product-images/`;

export async function prepareProductImage(imageUri) {
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
  const directoryInfo = await FileSystem.getInfoAsync(productImagesDirectory);

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(productImagesDirectory, {
      intermediates: true,
    });
  }
}

export async function saveProductImageLocally(imageUri) {
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
