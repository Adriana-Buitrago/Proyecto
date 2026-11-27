import { useState } from 'react';
import {
  View,
  Text,
  Switch,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePreferences } from '../hooks/usePreferences';
import { useSecureStorage } from '../hooks/useSecureStorage';

export default function SettingsScreen() {
  const {
    theme,
    setTheme,
    notifications,
    setNotifications,
  } = usePreferences();

  const {
    user,
    loading,
    saveUser,
    deleteUser,
  } = useSecureStorage();

  const [accessKey, setAccessKey] = useState('');

  async function handleSaveKey() {
    if (!accessKey.trim()) {
      Alert.alert('Atención', 'Ingresa una clave de administrador.');
      return;
    }

    try {
      await saveUser(accessKey.trim());
      setAccessKey('');
      Alert.alert('Correcto', 'Clave guardada de forma segura.');
    } catch {
      Alert.alert('Error', 'No fue posible guardar la clave.');
    }
  }

  async function handleDeleteKey() {
    try {
      await deleteUser();
      Alert.alert('Correcto', 'Clave eliminada.');
    } catch {
      Alert.alert('Error', 'No fue posible eliminar la clave.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Configuración</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias de la aplicación</Text>

        <View style={styles.option}>
          <View>
            <Text style={styles.optionTitle}>Tema oscuro</Text>
            <Text style={styles.description}>
              Guardar la preferencia de apariencia.
            </Text>
          </View>

          <Switch
            value={theme === 'dark'}
            onValueChange={(value) => setTheme(value ? 'dark' : 'light')}
          />
        </View>

        <View style={styles.option}>
          <View>
            <Text style={styles.optionTitle}>Notificaciones</Text>
            <Text style={styles.description}>
              Activar o desactivar las notificaciones.
            </Text>
          </View>

          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acceso del administrador</Text>

        <Text style={styles.description}>
          Guarda una clave de acceso protegida mediante almacenamiento seguro.
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Clave de administrador"
          placeholderTextColor="#94A3B8"
          value={accessKey}
          onChangeText={setAccessKey}
          secureTextEntry
          autoCapitalize="none"
        />

        <Pressable style={styles.button} onPress={handleSaveKey}>
          <Text style={styles.buttonText}>Guardar clave</Text>
        </Pressable>

        {!loading && (
          <Text style={styles.status}>
            {user ? 'Hay una clave guardada de forma segura.' : 'No hay una clave guardada.'}
          </Text>
        )}

        <Pressable style={styles.deleteButton} onPress={handleDeleteKey}>
          <Text style={styles.deleteButtonText}>Eliminar clave guardada</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  optionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
  },
  description: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 9,
    padding: 12,
    marginBottom: 12,
    color: '#1E293B',
  },
  button: {
    backgroundColor: '#7C3AED',
    padding: 13,
    borderRadius: 9,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  status: {
    color: '#475569',
    marginTop: 14,
    fontSize: 13,
  },
  deleteButton: {
    marginTop: 12,
    padding: 12,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#DC2626',
    fontWeight: '600',
  },
});