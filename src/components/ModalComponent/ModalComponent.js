import React, { useState, useContext } from "react";
import { Modal, StyleSheet, Text, Pressable, View, FlatList } from "react-native";
import { DataContext } from "../Context/DataContext";

const ModalComponent = () => {
  const { cart, setCart, buyProducts } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);

  const total = cart.reduce((acc, el) => acc + el.quanty * el.price, 0);

  const handleBuyPress = (product) => {
    buyProducts(product);
  };

  const handleDreasePress = (product) => {
    const productRepeat = cart.find((item) => item.id === product.id);

    productRepeat.quanty !== 1 &&
      setCart(cart.map((item) => (item.id === product.id ? { ...product, quanty: productRepeat.quanty - 1 } : item)));
  };

  const handleDeletePress = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  return (
    <View>
      <Pressable style={styles.modalButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.cartIcon}>🛒</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>❌</Text>
            </Pressable>
            <Text style={styles.modalText}>Tus Productos:</Text>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.modalTextProduct}>{item.productName}</Text>

                  <View style={styles.quantityContainer}>
                    <Pressable style={styles.quantityButton} onPress={() => handleDreasePress(item)}>
                      <Text style={styles.quantityButtonText}>➖</Text>
                    </Pressable>

                    <Text style={styles.modalTextProduct}>{item.quanty}</Text>

                    <Pressable style={styles.quantityButton} onPress={() => handleBuyPress(item)}>
                      <Text style={styles.quantityButtonText}>➕</Text>
                    </Pressable>
                  </View>

                  <Text style={styles.modalTextProduct}>
                    Total: ${item.quanty * item.price}
                    <Pressable onPress={() => handleDeletePress(item)}>
                      <Text style={styles.deleteIcon}>❌</Text>
                    </Pressable>
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
            <Text style={styles.totalText}>Total: ${total}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    left: 120,
  },
  buttonClose: {
    backgroundColor: "#333",
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 22,
    fontWeight: "bold",
  },
  modalButton: {
    position: "fixed",
    bottom: 30,
    left: 150,
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 30,
  },
  cartIcon: {
    fontSize: 20,
    color: "#fff",
  },
  cartItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 20,
  },
  modalTextProduct: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityButton: {
    backgroundColor: "#1bcb7f",
    borderRadius: 15,
    padding: 8,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "white",
    fontSize: 16,
  },
  deleteIcon: {
    fontSize: 18,
    color: "#ff4d4d",
  },
  totalText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1bcb7f",
  },
});

export default ModalComponent;
