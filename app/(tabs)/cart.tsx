import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/shared/components/Themed";
import { useCartStore } from "@/core/state";
import { Colors } from "@/core/constants";
import Divider from "@/shared/components/divider/divider";
import LandscapeCard from "@/shared/components/product-cards/landscape-card";
import { useEffect, useState } from "react";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { addToCart, removeFromCart, decrementQuantity, calculateTotalPrice } =
    useCartStore();

  const [totalPrice, setTotalPrice] = useState(0);
  // TODO: Add logic to calculate the delivery price based on the shipping address
  const deliveryPrice = totalPrice > 0 ? totalPrice * 0.005 : 0;

  useEffect(() => {
    setTotalPrice(calculateTotalPrice()); // Properly updating state
  }, [cartItems]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.mainCartContentContainer}>
        <View style={{ height: 100 }}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.title}>Cart</Text>
          </View>

          <View style={styles.dividerContainer}>
            <Divider backgroundColor={Colors.theme.primary} />
          </View>
        </View>

        {/*  region Cart Items */}
        {cartItems.map((cartItem, index) => (
          <View
            style={[
              styles.productsContainer,
              { borderBottomWidth: index === cartItems.length - 1 ? 0 : 2 },
            ]}
            key={index}
          >
            <LandscapeCard
              imageStyle={{ borderRadius: 4 }}
              onCardPress={() => console.log("View Cart")}
              iconWidth={10}
              iconHeight={10}
              onRemoveFromCart={() => removeFromCart(cartItem.product)}
              onDecrementQuantity={() => decrementQuantity(cartItem.product)}
              onIncrementQuantity={() => addToCart(cartItem.product)}
              product={cartItem.product}
            />
          </View>
        ))}
        {/* endregion */}
      </View>

      {/* TODO: Add the Promotion Code TextInput  */}

      <View style={styles.cartTotalContainer}>
        <View style={styles.cartPriceRow}>
          <Text style={styles.subtitle}>Subtotal</Text>
          <Text style={styles.subtitle}>{totalPrice}</Text>
        </View>

        <View style={styles.cartPriceRow}>
          <Text style={styles.subtitle}>Delivery</Text>
          <Text style={styles.subtitle}>{deliveryPrice}</Text>
        </View>

        <View style={styles.separator}></View>
        <View style={styles.cartPriceRow}>
          <Text style={styles.subtitle}>Total</Text>
          {/* Total price + delivery price */}
          <Text style={styles.subtitle}>{totalPrice + deliveryPrice}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme.light,
  },
  mainCartContentContainer: {
    paddingHorizontal: 20,
  },
  titleTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "AGaramondProBoldItalic",
    color: Colors.theme.primary,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    fontFamily: "Avenir",
    color: Colors.theme.primary,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    backgroundColor: Colors.theme.primary,
  },
  dividerContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 15,
  },
  productsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderBottomColor: Colors.theme.primary,
    borderBottomWidth: 2,
    paddingBottom: 20,
  },
  cartTotalContainer: {
    flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: Colors.theme.light_green,
    paddingBottom: 20,
  },
  cartPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    backgroundColor: "transparent",
  },
});
