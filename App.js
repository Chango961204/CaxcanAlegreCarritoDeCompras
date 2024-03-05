import React from "react";
import { StyleSheet, View } from "react-native";
import Products from "./src/components/Products/Products.js";
import ModalComponent from "./src/components/ModalComponent/ModalComponent.js";


import { DataProvider } from "./src/components/Context/DataContext";

export default function App() {
  return (
    <DataProvider>
      <View style={styles.container}>
        <Products />
        <ModalComponent />
      </View>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF3CF"

  },
});
