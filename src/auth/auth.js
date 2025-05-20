import * as SecureStore from 'expo-secure-store';
import api from '../api/api';

export async function login(email, password) {
  const response = await api.post('/login', { email, password });
  const token = response.data.token;
  await SecureStore.setItemAsync('auth_token', token);

  return response.data.user;
}

export async function logout() {
  const token = await SecureStore.getItemAsync('auth_token');
  if (token) {
    await api.post('/logout', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await SecureStore.deleteItemAsync('auth_token');
  }
}

export async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}
