import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/blv-logo.png')} style={styles.logo} />

      <Text style={styles.heading}>Thank you for purchasing</Text>
      <Text style={styles.subtext}>your holiday with us!</Text>

      <TouchableOpacity style={styles.button} onPress={goToHome}>
        <Text style={styles.buttonText}>Continue ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  heading: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  subtext: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#0047AB',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});
