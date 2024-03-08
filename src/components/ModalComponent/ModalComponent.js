import React, { useState, useContext } from "react";
import { Modal, StyleSheet, Text, Pressable, View, FlatList, Button, Animated } from "react-native";
import { DataContext } from "../Context/DataContext";
import { Linking } from "react-native";

const ModalComponent = () => {
  const { cart, setCart, buyProducts } = useContext(DataContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartAnimation = new Animated.Value(0);

  const total = cart.reduce((acc, el) => acc + el.quanty * el.price, 0);

  const handleBuyPress = (product) => {
    buyProducts(product);

    // Animación del carrito
    Animated.sequence([
      Animated.timing(cartAnimation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(cartAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleDecreasePress = (product) => {
    const productRepeat = cart.find((item) => item.id === product.id);

    productRepeat.quanty !== 1 &&
      setCart(cart.map((item) => (item.id === product.id ? { ...product, quanty: productRepeat.quanty - 1 } : item)));
  };

  const handleDeletePress = (product) => {
    setCart(cart.filter((item) => item.id !== product.id));
  };

  const handlePurchasePress = () => {
    // Lógica para realizar la compra
    setPurchasing(true);

    // Enviar mensaje de WhatsApp con la lista del carrito
    const message = `Pedido realizado con éxito! Total: $${total}\n\nProductos:\n${cart
      .map((item) => `${item.productName} - Cantidad: ${item.quanty} - Precio: $${item.quanty * item.price}`)
      .join("\n")}`;

    const whatsappURL = `https://wa.me/+5214921445179?text=${encodeURIComponent(message)}`;
    Linking.canOpenURL("https://wa.me/+5214921445179")
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappURL);
        } else {
          console.log("WhatsApp no está instalado");
        }
      })
      .catch((error) => {
        console.error("Error al intentar abrir WhatsApp", error);
      });

    // Reiniciar el carrito
    setCart([]);
    setCartOpen(false); // Cerrar el carrito después de la compra
  };

  const handleModalToggle = () => {
    // Alternar entre abrir y cerrar el carrito
    setModalVisible(!modalVisible);
    setCartOpen(!cartOpen);

    // Reiniciar el estado de compra al abrir el carrito
    setPurchasing(false);
  };

  return (
    <View>
      <Pressable style={styles.modalButton} onPress={handleModalToggle}>
        <Text style={styles.cartIcon}>🛒</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={handleModalToggle}>
              <Text style={styles.textStyle}>❌</Text>
            </Pressable>
            <Text style={styles.modalText}>Tus Productos:</Text>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Text style={styles.modalTextProduct}>{item.productName}</Text>

                  <View style={styles.quantityContainer}>
                    <Pressable style={styles.quantityButton} onPress={() => handleDecreasePress(item)}>
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
              keyExtractor={(item) => item.id.toString()}
            />
            <Text style={styles.totalText}>Total: ${total}</Text>

            {/* Button for making a purchase */}
            {!purchasing && (
              <Button title="Realizar Compra" onPress={handlePurchasePress} color="#1bcb7f" />
            )}

            {/* Display purchase success message */}
            {purchasing && <Text style={styles.purchaseSuccess}>Pedido realizado con éxito!</Text>}
          </View>
        </View>
      </Modal>
      {/* Animación del carrito */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 30,
          right: 10,  // Cambiado para mover el carrito a la esquina inferior derecha
          transform: [
            {
              translateY: cartAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.cartBadge}>{cart.length}</Text>
      </Animated.View>
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
    bottom: 50,
    left: 150,  // Cambiado para mover el carrito a la esquina inferior derecha
    backgroundColor: "#333",
    padding: 10,
    borderRadius: 30,
  },
  cartIcon: {
    fontSize: 25,
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
  purchaseSuccess: {
    marginTop: 10,
    fontSize: 18,
    color: "#1bcb7f",
  },
  cartBadge: {
    backgroundColor: "#1bcb7f",
    color: "#fff",
    padding: 6,
    borderRadius: 200,
    textAlign: "center",
    width: 20,
    position: "absolute",
    top: 1,
    left: 130,
    zIndex: 1,
  },
});

export default ModalComponent;
