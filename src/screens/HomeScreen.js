import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const userName = 'John'; // In real case, get from auth state

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.greeting}>Welcome back, {userName} 👋</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Trip to Singapore</Text>
        <Text style={styles.tripInfo}>Jun 10 - Jun 17 • 7 Nights</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>View Itinerary</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.grid}>
        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/visa-icon.png')} style={styles.gridIcon} />
          <Text style={styles.gridText}>Visa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/visa-icon.png')} style={styles.gridIcon} />
          <Text style={styles.gridText}>Tickets</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/visa-icon.png')} style={styles.gridIcon} />
          <Text style={styles.gridText}>Hotels</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <Image source={require('../assets/visa-icon.png')} style={styles.gridIcon} />
          <Text style={styles.gridText}>Insurance</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f4ff',
    padding: 20,
    borderRadius: 14,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tripInfo: {
    color: '#555',
    marginTop: 5,
    marginBottom: 15,
  },
  viewButton: {
    backgroundColor: '#0047AB',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '47%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    alignItems: 'center',
  },
  gridIcon: {
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  gridText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
