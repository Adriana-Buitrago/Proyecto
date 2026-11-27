import { useEffect, useState } from 'react';
import { secureStorage } from '../services/secureStorage';

export function useSecureStorage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSecureData = async () => {
      try {
        const savedToken = await secureStorage.getToken();
        const savedUser = await secureStorage.getUser();

        setToken(savedToken);
        setUser(savedUser);
      } catch (error) {
        console.error('Error al recuperar datos seguros:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSecureData();
  }, []);

  const saveToken = async (value: string) => {
    await secureStorage.saveToken(value);
    setToken(value);
  };

  const saveUser = async (value: string) => {
    await secureStorage.saveUser(value);
    setUser(value);
  };

  const deleteToken = async () => {
    await secureStorage.deleteToken();
    setToken(null);
  };

  const deleteUser = async () => {
    await secureStorage.deleteUser();
    setUser(null);
  };

  return {
    token,
    user,
    loading,
    saveToken,
    saveUser,
    deleteToken,
    deleteUser,
  };
}