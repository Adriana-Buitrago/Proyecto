import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({
  id: 'dj-sonido-preferences',
});

export const storageKeys = {
  theme: 'app_theme',
  notifications: 'app_notifications',
  language: 'app_language',
} as const;