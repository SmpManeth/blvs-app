import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../auth/AuthContext";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("auth_token");
    setUser(null);
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileRow}>
        <Image
          source={require("../assets/profile.png")}
          style={styles.profileIcon}
        />
        <View>
          <Text style={styles.profileName}>{user?.name}</Text>
          <Text style={styles.profileEmail}>{user?.email}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
    flex: 1,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
  },
  profileEmail: {
    fontSize: 14,
    color: "#64748b",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
