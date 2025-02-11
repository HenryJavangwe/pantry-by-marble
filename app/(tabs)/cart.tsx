import { ScrollView, StyleSheet } from "react-native";

import { Text, View } from "@/shared/components/Themed";
import { useCartStore } from "@/core/state";
import { Colors } from "@/core/constants";
import Divider from "@/shared/components/divider/divider";
import LandscapeCard from "@/shared/components/product-cards/landscape-card";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { addToCart, removeFromCart, decrementQuantity } = useCartStore();
  return (
    <ScrollView style={styles.container}>
      <View style={{ height: 100 }}>
        <View style={styles.titleTextContainer}>
          <Text style={styles.title}>Cart</Text>
        </View>

        <View style={styles.dividerContainer}>
          <Divider backgroundColor={Colors.theme.primary} />
        </View>
      </View>
      <View style={styles.productsContainer}>
        {cartItems.map((cartItem) => (
          <LandscapeCard
            imageSource={cartItem.product.image}
            imageStyle={{ borderRadius: 4 }}
            title={cartItem.product.name}
            price={cartItem.product.price}
            onCardPress={() => console.log("View Cart")}
            iconWidth={10}
            iconHeight={10}
            key={cartItem.product.id}
            quantity={cartItem.quantity}
            onRemoveFromCart={() => removeFromCart(cartItem.product)}
            onDecrementQuantity={() => decrementQuantity(cartItem.product)}
            onIncrementQuantity={() => addToCart(cartItem.product)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.theme.light,
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
    marginVertical: 30,
    height: 1,
    width: "80%",
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
  },
});
