import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const documentGroups = [
  {
    id: '1',
    title: 'Flight Ticket - Colombo to Singapore',
    type: 'Ticket',
    icon: require('../assets/ticket-icon.png'),
  },
  {
    id: '2',
    title: 'Hotel Voucher - Hyatt Regency',
    type: 'Hotel',
    icon: require('../assets/ticket-icon.png'),
  },
  {
    id: '3',
    title: 'Visa - Singapore Tourist',
    type: 'Visa',
    icon: require('../assets/ticket-icon.png'),
  },
];

export default function DocumentListScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('DocumentView', {
          documentId: item.id,
          documentTitle: item.title,
        })
      }
    >
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.type}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Documents</Text>

      <FlatList
        data={documentGroups}
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f6fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  type: {
    fontSize: 13,
    color: '#888',
    marginTop: 3,
  },
});
