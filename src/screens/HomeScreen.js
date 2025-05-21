import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../auth/AuthContext";

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setUser } = React.useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("auth_token");
    setUser(null);
    navigation.replace("Login"); // go back to login screen
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync("auth_token");
      try {
        const response = await api.get("/customer", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);

      } catch (error) {
        console.error("Failed to fetch home data", error);
      }
    };

    fetchData();
  }, []);
  

  if (!userData) return null;

  const {user , trip, documents } = userData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Welcome back, {user.name} 👋</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{trip.title}</Text>
        <Text style={styles.tripInfo}>
          {trip.start_date} - {trip.end_date}
        </Text>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => navigation.navigate("ItineraryScreen")}
        >
          <Text style={styles.viewButtonText}>View Itinerary</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Your Travel Documents</Text>
      <View style={styles.grid}>
        {Object.entries(documents).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={styles.gridItem}
            onPress={() => navigation.navigate("DocumentList")}
          >
            <Image
              source={require("../assets/visa-icon.png")}
              style={styles.gridIcon}
            />
            <Text style={styles.gridText}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
              {value ? "" : " (Missing)"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.profileBox}>
        <View style={styles.profileRow}>
          <Image
            source={require("../assets/profile.png")}
            style={styles.profileIcon}
          />
          <View>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f0f4ff",
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tripInfo: {
    color: "#555",
    marginTop: 5,
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: "#0047AB",
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    alignItems: "center",
  },
  gridIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: "500",
  },
  profileBox: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  profileIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
    borderRadius: 20,
  },

  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },

  profileEmail: {
    fontSize: 13,
    color: "#64748b",
  },

  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },

  logoutText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
