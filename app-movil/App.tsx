import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import AppNavigator from './src/navigation/AppNavigator';
import { queryClient } from './src/services/queryClient';
import { asyncStoragePersister } from './src/services/queryPersistence';

export default function App() {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: asyncStoragePersister,
        maxAge: 1000 * 60 * 60 * 24,
        buster: 'semana-7',
      }}
    >
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </SafeAreaProvider>
    </PersistQueryClientProvider>
  );
}