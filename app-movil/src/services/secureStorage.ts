import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'dj_sonido_auth_token';
const USER_KEY = 'dj_sonido_user_data';

export const secureStorage = {
  async saveToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken(): Promise<string | null> {
    return SecureStore.getItemAsync(TOKEN_KEY);
  },

  async deleteToken(): Promise<void> {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  async saveUser(user: string): Promise<void> {
    await SecureStore.setItemAsync(USER_KEY, user);
  },

  async getUser(): Promise<string | null> {
    return SecureStore.getItemAsync(USER_KEY);
  },

  async deleteUser(): Promise<void> {
    await SecureStore.deleteItemAsync(USER_KEY);
  },
};