import { StatusBar } from "expo-status-bar";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, Alert } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function Main(props) {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}/products/`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/banners/`)
      .then((result) => {
        setBanners(result.data.banners);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <View>
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

          <Text style={styles.productTitle}>Products</Text>
          <View style={styles.productWrap}>
            {products &&
              products.map((product, index) => {
                return (
                  <TouchableOpacity
                    key={product.id}
                    onPress={() => {
                      props.navigation.navigate("Product", { id: product.id });
                    }}
                  >
                    <View style={styles.productCard}>
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
                          <Image source={{ uri: `https://cdn-icons-png.flaticon.com/512/2163/2163350.png` }} style={styles.productAvatar} />
                          <Text style={styles.productSellerName}>4NITURE</Text>
                        </View>
                        <Text style={styles.productCategory}>{product.category}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  productTitle: {
    fontSize: 24,
    paddingLeft: 50,
    paddingTop: 30,
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
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 8,
    paddingLeft: 5,
  },
  productSellerName: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "bold",
  },
  productCategory: {
    fontSize: 12,
    marginRight: 5,
    fontWeight: "bold",
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
    resizeMode: "cover",
  },
  banners: {
    width: "100%",
    position: "relative",
    height: 700,
  },
});
