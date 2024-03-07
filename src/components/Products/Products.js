import React, { useContext, useState } from "react";
import { DataContext } from "../Context/DataContext.js";
import { Pressable, Text, View, FlatList, Image, StyleSheet, Linking } from "react-native";
import { MaterialIcons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const Products = () => {
  const { buyProducts } = useContext(DataContext);
  const [isPressing, setIsPressing] = useState(false);

  const categories = [
    { id: "cerveza", title: "Cerveza" },
    { id: "pulque", title: "Pulque" },
    { id: "sinAlcohol", title: "Sin Alcohol" },
  ];

  const productos = {
    cerveza: [
      {
        id: 1,
        productName: "Cerveza Corona",
        price: 30,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJrk0Q8NNQhTC4X_JOkoycohNwx3atN-GBKiQjBkuGOw&s",
      },
      {
        id: 2,
        productName: "Cerveza Victoria",
        price: 30,
        img: "https://chupify.myshopify.com/cdn/shop/products/Cerveza-Victoria-355ml_grande.jpg?v=1466920387",
      },
      {
        id: 3,
        productName: "Mega Corona",
        price: 75,
        img: "https://superlavioleta.com/cdn/shop/files/Corona_120_mega.png?v=1707493914",
      },
      {
        id: 4,
        productName: "Mega Victoria",
        price: 75,
        img: "https://grupoelvalor.com/wp-content/uploads/2018/12/victoria-mega.png",
      },
    ],
    pulque: [
      {
        id: 5,
        productName: "Pulque Natural",
        price: 45,
        img: "https://scontent.fzcl4-1.fna.fbcdn.net/v/t39.30808-6/268955288_1006277776593646_5109587160801435302_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=jolkXckPg3sAX9tBhdY&_nc_ht=scontent.fzcl4-1.fna&oh=00_AfAYuvlVbEUUb2f47dcYGFR7j3BiNc5-xIwKsTwzD4VuPw&oe=65ECFC00",
      },
      {
        id: 6,
        productName: "Curado",
        price: 75,
        img: "https://scontent.fzcl4-1.fna.fbcdn.net/v/t39.30808-6/342206322_731818238677618_4535148659133752881_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ymMLvq-03z4AX-Snohb&_nc_ht=scontent.fzcl4-1.fna&oh=00_AfCEvOXehC3t3qgU_IqkrXY6ojAJKblIpQ3rJvBT-cSm3A&oe=65EE9ADA",
      },
    ],
    sinAlcohol: [
      {
        id: 7,
        productName: "Refresco",
        price: 25,
        img: "https://m.media-amazon.com/images/I/61f2igQ81GL._AC_UF1000,1000_QL80_.jpg",
      },

      {
        id: 8,
        productName: "Bebida sin Alcohol",
        price: 25,
        img: "https://http2.mlstatic.com/D_NQ_NP_989668-MLM73991428533_012024-O.webp",
      },
    ],
  
  };

  const handleBuyPress = (product) => {
    setIsPressing(true);
    buyProducts(product);
    setTimeout(() => {
      setIsPressing(false);
    }, 100);
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Pressable
        style={({ pressed }) => [
          styles.productImageContainer,
          {
            opacity: pressed ? 0.7 : 1,
          },
        ]}
        onPress={() => handleBuyPress(item)}
      >
        <Image source={{ uri: item.img }} style={styles.productImage} />
      </Pressable>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text style={styles.productPrice}>Precio: ${item.price}</Text>
      <Pressable
        style={({ pressed }) => [
          styles.buyButton,
          {
            backgroundColor: pressed ? "#1bcb7f" : "#15a267",
          },
        ]}
        onPress={() => handleBuyPress(item)}
      >
        <Text style={styles.buyButtonText}>Agregar al carrito</Text>
      </Pressable>
    </View>
  );

  const renderCategory = ({ item }) => (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{item.title}</Text>
      <FlatList
        data={productos[item.id]}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri:
              "https://scontent.fbjx1-1.fna.fbcdn.net/v/t39.30808-6/342206322_731818238677618_4535148659133752881_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=ymMLvq-03z4AX9mUuGQ&_nc_ht=scontent.fbjx1-1.fna&oh=00_AfDXtn8Pir4eyE9Oz5CVuubnyM0YlAMJQoWEbXCc5SvCzQ&oe=65ECA09A",
          }}
          style={styles.logoImage}
        />
        <Text style={styles.header}>Caxcan Alegre!</Text>
      </View>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>CONTACTANOS</Text>
        <View style={styles.contactIconsContainer}>
          <MaterialIcons
            name="facebook"
            size={24}
            color="white"
            onPress={() => Linking.openURL("https://www.facebook.com/elcaxcanalegre")}
          />
          <FontAwesome5
            name="whatsapp"
            size={24}
            color="white"
            onPress={() => Linking.openURL("https://wa.me/+5214921445179")}
          />
          <FontAwesome
            name="instagram"
            size={24}
            color="white"
            onPress={() => Linking.openURL("https://www.instagram.com/elcaxcanalegre/")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#333",
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  productItem: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  productImageContainer: {
    width: "100%",
    height: 150,
    overflow: "hidden",
    borderRadius: 20,
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  productName: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 8,
    textAlign: "center",
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    color: "#1bcb7f",
    textAlign: "center",
  },
  buyButton: {
    backgroundColor: "#15a267",
    padding: 10,
    width: "100%",
    alignSelf: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginTop: 5,
  },
  buyButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  contactContainer: {
    backgroundColor: "#50D0FF",
    paddingBottom: 15,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 10,
    alignItems: "center",
    marginTop: 10,
  },
  contactText: {
    color: "#FFFBE6",
    fontWeight: "bold",
    paddingVertical: 15,
    fontSize: 20,
  },
  contactIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 10,
  },
  headerContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  logoImage: {
    width: 50,
    height: 50,
    marginBottom: 10,
    resizeMode: "contain",
    borderRadius: 10,
  },
});

export default Products;
