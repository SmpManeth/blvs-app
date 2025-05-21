import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../auth/AuthContext";
import { logout } from "../api/auth";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <View style={styles.card}>
        <Image
          source={require("../assets/profile.png")}
          style={styles.profileIcon}
        />
        <Text style={styles.profileName}>
          {user.user?.name || "Unknown User"}
        </Text>
        <Text style={styles.profileEmail}>
          {user.user?.email || "No email available"}
        </Text>
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 40,
      backgroundColor: "#f8fafc", // Tailwind 'slate-50'
    },
    heading: {
      fontSize: 28,
      fontWeight: "700",
      color: "#1e293b", // slate-800
      marginBottom: 30,
    },
    card: {
      backgroundColor: "#ffffff",
      borderRadius: 16,
      padding: 24,
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      marginBottom: 40,
    },
    profileIcon: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 16,
    },
    profileName: {
      fontSize: 22,
      fontWeight: "600",
      color: "#0f172a", // slate-900
    },
    profileEmail: {
      fontSize: 15,
      color: "#64748b", // slate-500
      marginTop: 4,
    },
    logoutButton: {
      backgroundColor: "#ef4444", // red-500
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#ef4444",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
    },
    logoutText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  