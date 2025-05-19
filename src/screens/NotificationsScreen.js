import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const notifications = [
  {
    id: '1',
    title: 'Flight Time Changed',
    message: 'Your flight to Singapore has been rescheduled to 10:45 AM.',
    timestamp: '5 mins ago',
  },
  {
    id: '2',
    title: 'Hotel Confirmation',
    message: 'Your booking at Oasia Suites is confirmed.',
    timestamp: '2 hours ago',
  },
  {
    id: '3',
    title: 'New Document Available',
    message: 'Your travel insurance has been uploaded.',
    timestamp: '1 day ago',
  },
];

export default function NotificationsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.notification}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Updates & Alerts</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  notification: {
    backgroundColor: '#f0f4ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 6,
  },
});
