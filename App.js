import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./config/constants";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import Carousel from "react-native-reanimated-carousel";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export default function App() {
  const [products, setProducts] = useState([]);
  const [banners, setbanners] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        console.log("nf", result.data.banners);
        setbanners(result.data.banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              Alert.alert("배너클릭");
            }}
          >
            <Carousel
              width={Dimensions.get("window").width}
              height={300}
              autoPlay={true}
              sliderWidth={Dimensions.get("window").width}
              itemWidth={Dimensions.get("window").width}
              itemHeight={300}
              data={banners}
              renderItem={(banner) => {
                return <Image source={{ uri: `${API_URL}/${banner.item.imageUrl}` }} style={styles.bannerImage} />;
              }}
            />
          </TouchableOpacity>

          <Text>Products</Text>
          <View style={styles.productWrap}>
            {products &&
              products.map((product, index) => {
                console.log(product);
                return (
                  <View style={styles.productCard} key={product.id}>
                    {product.soldout === 1 && <View style={styles.productBlur} />}
                    <View>
                      <Image source={{ uri: `${API_URL}/${product.imageUrl}` }} style={styles.productImage} resizeMode={"contain"} />
                    </View>
                    <View style={styles.productContent}>
                      <Text style={styles.productName}>{product.name}</Text>
                      <Text style={styles.productPrice}>{product.price}원</Text>
                    </View>
                    <View style={styles.productFooter}>
                      <View style={styles.productSeller}>
                        <Image source={{ uri: `https://cdn-icons-png.flaticon.com/512/10277/10277946.png` }} style={styles.productAvatar} />
                        <Text style={styles.productSellerName}>{product.seller}</Text>
                      </View>
                      <Text style={styles.productDate}>{dayjs(product.createdAt).fromNow()}</Text>
                    </View>
                  </View>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  productWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: 500,
    justifyContent: "center",
  },
  productCard: {
    width: 320,
    borderColor: "rgb(230,230,230)",
    borderWidth: 1,
    borderRadius: 16,
    backgroundColor: "#fff",
    margin: 20,
  },
  productImage: {
    width: "100%",
    height: 210,
  },
  productContent: {
    padding: 8,
  },
  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },
  productAvatar: {
    width: 24,
    height: 24,
  },
  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    padding: 8,
  },
  productName: {
    fontSize: 16,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },
  productDate: {
    fontSize: 16,
  },
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  banners: {
    width: "100%",
    position: "relative",
    height: 700,
  },
});
