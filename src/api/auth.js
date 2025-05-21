import { AuthContext } from "../auth/AuthContext";
import api from "./api";
import * as SecureStore from "expo-secure-store";

// Login user and store token
export async function login(email, password) {
  try {
    const response = await api.post("/login", { email, password });
    const { token, user } = response.data;

    await SecureStore.setItemAsync("auth_token", token);
    return user;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Login failed. Please try again."
    );
  }
}

// Logout user and delete token
export async function logout() {
  const { setUser } = useContext(AuthContext);
  try {
    await api.post("/logout"); // Token auto-added by api.js
    setUser(null);
  } catch (error) {
    console.warn("Logout failed silently:", error.message);
  }

  await SecureStore.deleteItemAsync("auth_token");
}

// Check if user is logged in
export async function isLoggedIn() {
  const token = await SecureStore.getItemAsync("auth_token");
  return !!token;
}

// Optional: Get token (if needed elsewhere)
export async function getToken() {
  return await SecureStore.getItemAsync("auth_token");
}
