import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";


export default function HomeScreen() {
   
  return (
<View style={[styles.container]}>
      <Text style={styles.header}>home  page</Text>
    
 
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: { flex: 1, padding: 10 },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  actionCard: {
    flex: 1,
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    marginHorizontal: 5,
    elevation: 2,
  },
  actionText: { marginTop: 5, fontSize: 14, fontWeight: "500" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  listText: { fontSize: 16, fontWeight: "500" },
});