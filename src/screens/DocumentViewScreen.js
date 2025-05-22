import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute, useNavigation } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import Header from "../components/Header";

export default function DocumentViewScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

  const { documentTitle, documentUrl } = route.params;
  // const fullUrl = `https://bluelotusvacations.uk/storage/${documentUrl}`;
  const fullUrl = "https://bluelotusvacations.uk/pdfs/brightsun_contract.pdf";

  const handleDownload = async () => {
    try {
      const fileUri =
        FileSystem.documentDirectory + documentUrl.split("/").pop();

      const downloadResumable = FileSystem.createDownloadResumable(
        fullUrl,
        fileUri
      );
      const { uri } = await downloadResumable.downloadAsync();

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Download failed", "Unable to download the document.");
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={documentTitle || "Document"}
        rightIcon="person-circle-outline"
        onRightPress={() => navigation.navigate("ProfileScreen")}
        showBack={true}
      />

      <WebView
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${fullUrl}`,
        }}
        style={styles.webView}
        originWhitelist={["*"]}
        startInLoadingState
        onLoad={() => setLoading(false)}
        onError={() => setLoading(false)}
      />
      {loading && (
        <ActivityIndicator
          size="large"
          color="#0047AB"
          style={{ position: "absolute", top: "50%", alignSelf: "center" }}
        />
      )}

      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Text style={styles.downloadText}>📥 Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webView: {
    flex: 1,
  },
  downloadButton: {
    backgroundColor: "#0047AB",
    padding: 12,
    alignItems: "center",
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
