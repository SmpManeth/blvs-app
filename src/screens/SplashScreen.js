import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/splash-bg.png')} // Replace with your background image
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Image
          source={require('../assets/blv-logo.png')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.title}>
          All your <Text style={styles.highlight}>travel documents</Text> in One app!
        </Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Continue ➜</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 30,
    marginBottom: 100,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 36,
  },
  highlight: {
    color: '#FFD700', // Yellow
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 30,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
