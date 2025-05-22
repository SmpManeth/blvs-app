import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  fetchCustomerDocuments,
  fetchCustomerDocumentsbyType,
} from "../api/customers";
import Header from "../components/Header";

export default function DocumentListScreen({ route }) {
  const { documentType } = route.params;
  const navigation = useNavigation();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  //get alla the documents
  useEffect(() => {
    const fetchData = async () => {
      try {
        const documents = await fetchCustomerDocumentsbyType(documentType);
        setDocuments(documents);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("DocumentView", {
          documentId: item.id,
          documentTitle: item.type,
          documentUrl: item.file_path,
        })
      }
    >
      <Image
        source={require("../assets/ticket-icon.png")}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Header
        title="Document List"
        rightIcon="person-circle-outline"
        onRightPress={() => navigation.navigate("ProfileScreen")}
        showBack={true}
      />
      <View style={styles.container}>
        <Text style={styles.heading}>Your Documents</Text>

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#0047AB"
            style={{ marginTop: 100 }}
          />
        ) : (
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f6fa",
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
    fontWeight: "500",
  },
  type: {
    fontSize: 13,
    color: "#888",
    marginTop: 3,
  },
});
