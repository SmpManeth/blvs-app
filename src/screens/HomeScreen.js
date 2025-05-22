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
import Header from "../components/Header";
import homeBG from "../assets/home-bg.png";

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

  const { user, trip, documents } = userData;

  return (
    <>
      <Header
        title="Dashboard"
        rightIcon="person-circle-outline"
        onRightPress={() => navigation.navigate("ProfileScreen")}
        showBack={false}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Image style={ styles.img} source={homeBG}></Image>
        <View style={styles.card}>
          <Text style={styles.cardsubtitle}>Your Trip</Text>
          <Text style={styles.cardTitle}>{trip.title}</Text>
          <Text style={styles.tripInfo}>
            {trip.start_date} - {trip.end_date}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Your Travel Documents</Text>
        <View style={styles.grid}>
          {Object.entries(documents).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={styles.gridItem}
              onPress={() =>
                navigation.navigate("DocumentList", { documentType: key })
              } // Pass the document type to the DocumentList screen
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
  },
  img: {
    width: "100%",
    borderRadius: 20,
    marginBottom: 20,
  },
  card: {
    margin: 20,
    backgroundColor: "#f0f4ff",
    padding: 10,
    borderRadius: 14,
    marginBottom: 30,
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: 170,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardsubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 15,
  },
  tripInfo: {
    color: "#555",
    marginTop: 5,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    marginTop: 20,
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
