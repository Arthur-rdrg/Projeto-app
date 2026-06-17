import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { shoppingStyles as styles } from '../../styles/shoppingStyles';
import { colors } from '../../styles/theme';

type CameraCaptureProps = {
  onCancel: () => void;
  onPhotoTaken: (imageUri: string) => void;
};

export default function CameraCapture({ onCancel, onPhotoTaken }: CameraCaptureProps) {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  async function handleTakePicture() {
    if (!cameraRef.current || isTakingPicture) {
      return;
    }

    try {
      setIsTakingPicture(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: false,
      });
      onPhotoTaken(photo.uri);
    } finally {
      setIsTakingPicture(false);
    }
  }

  if (!permission) {
    return (
      <View style={styles.cameraScreen}>
        <ActivityIndicator color={colors.white} />
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.cameraScreen}>
        <Pressable onPress={onCancel} style={({ pressed }) => [styles.cameraBackButton, pressed && styles.pressed]}>
          <Ionicons color={colors.white} name="chevron-back" size={22} />
        </Pressable>
        <View style={styles.permissionBox}>
          <Ionicons color={colors.green} name="camera-outline" size={42} />
          <Text style={styles.permissionTitle}>Permitir camera</Text>
          <Text style={styles.permissionText}>
            O app precisa da camera para fotografar o produto na gondola.
          </Text>
          <Pressable onPress={requestPermission} style={({ pressed }) => [styles.primaryAction, pressed && styles.pressed]}>
            <Text style={styles.primaryActionText}>Permitir acesso</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.cameraScreen}>
      <View style={styles.cameraHeader}>
        <Pressable onPress={onCancel} style={({ pressed }) => [styles.cameraBackButton, pressed && styles.pressed]}>
          <Ionicons color={colors.white} name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.cameraTitle}>Fotografar produto</Text>
      </View>

      <View style={styles.cameraFrame}>
        <CameraView ref={cameraRef} facing="back" mode="picture" style={styles.cameraPreview} />
        <View pointerEvents="none" style={styles.cameraGrid}>
          <View style={styles.focusBox} />
          <Text style={styles.cameraHint}>Fotografe o produto na gondola para conferir o preco</Text>
        </View>
      </View>

      <Pressable
        disabled={isTakingPicture}
        onPress={handleTakePicture}
        style={({ pressed }) => [styles.shutterButton, pressed && styles.pressed]}
      >
        {isTakingPicture ? (
          <ActivityIndicator color={colors.green} />
        ) : (
          <View style={styles.shutterInner} />
        )}
      </Pressable>
      <Text style={styles.shutterHint}>Toque para fotografar</Text>
    </View>
  );
}
