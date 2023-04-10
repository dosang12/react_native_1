import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import { color } from "react-native-reanimated";

const Product = (props) => {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (!product) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image style={styles.productImage} source={{ uri: `${API_URL}/${product.imageUrl}` }} resizeMode="contain" />
        </View>
        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Text style={styles.sellerText}>{product.seller}</Text>
            <Image style={styles.avatarImage} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3397/3397536.png" }} />
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>{product.price}원</Text>
          <Text style={styles.productDate}>상품등록일:{dayjs(product.createdAt).format("YYYY년 MM월 DD일")}</Text>
          <Text style={styles.productDesc}>{product.description}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productImage: {
    width: "100%",
    height: 300,
  },
  productSection: {
    padding: 16,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarImage: {
    width: 50,
    height: 50,
  },
  divider: {
    backgroundColor: "#aaa",
    height: 1,
    marginVertical: 16,
  },
  sellerText: {
    color: "#333",
  },
  productName: {
    fontSize: 24,
    fontWeight: 400,
  },
  productPrice: { fontSize: 16, fontWeight: 700, marginTop: 8 },
  productDate: { fontSize: 14, marginTop: 4, color: "#ddd" },
  productDesc: { fontSize: 12, marginTop: 10, color: "#666" },
});

export default Product;
