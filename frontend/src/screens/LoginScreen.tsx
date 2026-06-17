import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  getAuthErrorMessage,
  loginWithEmail,
  registerWithEmail,
} from '../services/authService';
import { loginStyles as styles } from '../styles/loginStyles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    setErrorMessage('');

    if (isRegisterMode && !fullName.trim()) {
      setErrorMessage('Digite seu nome completo.');
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage('Preencha e-mail e senha.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    if (isRegisterMode && password !== confirmPassword) {
      setErrorMessage('As senhas nao conferem.');
      return;
    }

    try {
      setIsSubmitting(true);

      if (isRegisterMode) {
        await registerWithEmail(email, password, fullName);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.greenHeader}>
        {isRegisterMode ? (
          <Pressable
            onPress={() => {
              setErrorMessage('');
              setIsRegisterMode(false);
            }}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Ionicons color="#FFFFFF" name="chevron-back" size={22} />
            <Text style={styles.backButtonText}>Voltar ao login</Text>
          </Pressable>
        ) : null}

        <View style={styles.logoBox}>
          <Ionicons color="#0AB64F" name="bag-handle-outline" size={38} />
        </View>
        <Text style={styles.title}>{isRegisterMode ? 'Criar conta' : 'Lista Inteligente'}</Text>
        <Text style={styles.subtitle}>
          {isRegisterMode ? 'E rapido e gratuito' : 'Confira suas compras pelo celular'}
        </Text>
      </View>

      <View style={styles.form}>
        {isRegisterMode ? (
          <>
            <Text style={styles.label}>Nome completo</Text>
            <TextInput
              onChangeText={setFullName}
              placeholder="Maria Silva"
              placeholderTextColor="#A3A8B0"
              style={styles.input}
              value={fullName}
            />
          </>
        ) : null}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="seuemail@exemplo.com"
          placeholderTextColor="#A3A8B0"
          style={styles.input}
          value={email}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          onChangeText={setPassword}
          placeholder="Minimo 6 caracteres"
          placeholderTextColor="#A3A8B0"
          secureTextEntry
          style={styles.input}
          value={password}
        />

        {isRegisterMode ? (
          <>
            <Text style={styles.label}>Confirmar senha</Text>
            <TextInput
              onChangeText={setConfirmPassword}
              placeholder="Repita a senha"
              placeholderTextColor="#A3A8B0"
              secureTextEntry
              style={styles.input}
              value={confirmPassword}
            />
          </>
        ) : null}

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Pressable
          disabled={isSubmitting}
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
            isSubmitting && styles.disabledButton,
          ]}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.primaryButtonText}>
              {isRegisterMode ? 'Cadastrar' : 'Entrar'}
            </Text>
          )}
        </Pressable>

        {!isRegisterMode ? (
          <Pressable
            disabled={isSubmitting}
            onPress={() => {
              setErrorMessage('');
              setIsRegisterMode(true);
            }}
            style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressed]}
          >
            <Text style={styles.secondaryButtonText}>Criar uma conta</Text>
          </Pressable>
        ) : (
          <Text style={styles.terms}>
            Ao criar uma conta, voce concorda com os Termos de Uso e a Politica
            de Privacidade.
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
