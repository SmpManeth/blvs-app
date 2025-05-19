import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function DocumentViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { documentId, documentTitle } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{documentTitle}</Text>

      <Image
        source={require('../assets/sample-pdf-preview.png')} // Placeholder thumbnail
        style={styles.preview}
        resizeMode="contain"
      />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  preview: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 30,
  },
  backButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#0047AB',
  },
  backText: {
    color: '#fff',
    fontWeight: '600',
  },
});
