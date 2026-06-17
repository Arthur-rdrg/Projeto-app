import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import ShoppingListScreen from './src/screens/ShoppingListScreen';
import { watchAuthState } from './src/services/authService';

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = watchAuthState((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="#1E7F54" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {user ? <ShoppingListScreen user={user} /> : <LoginScreen />}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F2',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F7F7F2',
    justifyContent: 'center',
  },
});
