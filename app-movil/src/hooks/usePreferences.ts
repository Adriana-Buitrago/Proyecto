import { useState } from 'react';
import { storage, storageKeys } from '../services/storage';

type Theme = 'light' | 'dark';

export function usePreferences() {
  const [theme, setThemeState] = useState<Theme>(
    storage.getString(storageKeys.theme) === 'dark' ? 'dark' : 'light'
  );

  const [notifications, setNotificationsState] = useState<boolean>(
    storage.getBoolean(storageKeys.notifications) ?? true
  );

  const setTheme = (value: Theme) => {
    storage.set(storageKeys.theme, value);
    setThemeState(value);
  };

  const setNotifications = (value: boolean) => {
    storage.set(storageKeys.notifications, value);
    setNotificationsState(value);
  };

  return {
    theme,
    setTheme,
    notifications,
    setNotifications,
  };
}