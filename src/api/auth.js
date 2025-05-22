import { useNavigation } from "@react-navigation/native";
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

  try {
    await api.post("/logout"); // Token auto-added by api.js
    console.log("Logout successful");

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

// Validate token
export async function validateToken() {
  const token = await getToken();
  if (!token) return false;

  try {
    const response = await api.get("/validate-token", {
      headers: { Authorization: `Bearer ${token}` },
    });
  console.log("Token validation response:", response.data);
    return response.data.valid;
  } catch (error) {
    console.warn("Token validation failed:", error.message);
    return false;
  }
}
