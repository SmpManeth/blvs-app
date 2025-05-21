import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../api/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await login(email, password);
      Alert.alert("Success", `Welcome, ${user.name}`);
      navigation.replace("Welcome"); // Or your main app screen
    } catch (error) {
      console.log(error);
      Alert.alert("Login Failed", "Invalid email or password");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/login-bg.jpg")} // Replace with your blurred palm image
      style={styles.container}
    >
      <View style={styles.card}>
        <Image source={require("../assets/blv-logo.png")} style={styles.logo} />

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Your Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            style={styles.input}
            placeholder="Your Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 30,
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
  },
  loginButton: {
    backgroundColor: "#0047AB",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 10,
  },
  loginButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
  },
});
