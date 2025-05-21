import React, { useContext, useEffect, useState } from "react";
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
import { fetchCustomerProfile } from "../api/customers";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = await SecureStore.getItemAsync("auth_token");
      try {
       const userData = await fetchCustomerProfile();
        setUserData(userData);

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
 
});
