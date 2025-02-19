import { FlatList, StyleSheet } from "react-native";
import React, { useMemo } from "react";
import { Text, View } from "@/shared/components/Themed";
import { useCartStore } from "@/core/state";
import { Colors } from "@/core/constants";
import Divider from "@/shared/components/divider/divider";
import LandscapeCard from "@/shared/components/product-cards/landscape-card";
import NoProductsInCart from "@/shared/components/empty-state/no-products";
import Button from "@/shared/components/button/button";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cartItems);
  const { addToCart, removeFromCart, decrementQuantity, calculateTotalPrice } =
    useCartStore();

  const totalPrice = calculateTotalPrice();
  // TODO: Add logic to calculate the delivery price based on the shipping address
  const deliveryPrice = useMemo(() => {
    return totalPrice > 0 ? totalPrice * 0.005 : 0;
  }, [totalPrice]);

  if (!cartItems.length) {
    return <NoProductsInCart />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.mainCartContentContainer}>
        <View
          style={[
            styles.containerHorizontalPadding,
            { height: 100, marginBottom: 20 },
          ]}
        >
          <View style={styles.titleTextContainer}>
            <Text style={styles.title}>Cart</Text>
          </View>

          <View style={styles.dividerContainer}>
            <Divider backgroundColor={Colors.theme.primary} />
          </View>
        </View>

        {/* region Cart Items */}
        <View
          style={[styles.cartItemsContainer, styles.containerHorizontalPadding]}
        >
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item, index }) => (
              <View
                style={[
                  styles.cartItemsInnerContainer,
                  {
                    borderBottomWidth: index === cartItems.length - 1 ? 0 : 2,
                  },
                ]}
              >
                <LandscapeCard
                  imageStyle={{ borderRadius: 4 }}
                  onCardPress={() => console.log("View Cart")}
                  iconWidth={10}
                  iconHeight={10}
                  onRemoveFromCart={() => removeFromCart(item.product)}
                  onDecrementQuantity={() => decrementQuantity(item.product)}
                  onIncrementQuantity={() => addToCart(item.product)}
                  product={item.product}
                />
              </View>
            )}
          />
        </View>
        {/* endregion */}

        {/* TODO: Add the Promotion Code TextInput  */}

        {/* Region Cart Price */}
        <View
          style={[styles.cartTotalContainer, styles.containerHorizontalPadding]}
        >
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
            <Text style={styles.totalPriceBoldText}>Total</Text>
            {/* Total price + delivery price */}
            <Text style={styles.totalPriceBoldText}>
              R {totalPrice + deliveryPrice}
            </Text>
          </View>

          <View style={styles.checkoutButtonContainer}>
            <Button buttonStyles={styles.checkoutButton}>
              <Text style={styles.buttonText}>Checkout</Text>
            </Button>
          </View>
        </View>
        {/* endregion */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.theme.light,
  },
  mainCartContentContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  containerHorizontalPadding: {
    paddingHorizontal: 20,
  },

  titleTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    height: 100,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "AGaramondProBoldItalic",
    color: Colors.theme.primary,
  },
  subtitle: {
    fontSize: 14,
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
    justifyContent: "center",
    alignItems: "center",
    height: 15,
    flex: 1,
  },
  cartItemsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  cartItemsInnerContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    borderBottomColor: Colors.theme.primary,
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  cartTotalContainer: {
    padding: 5,
    backgroundColor: Colors.theme.light_green,
  },
  cartPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  totalPriceBoldText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "AGaramondProBold",
    color: Colors.theme.primary,
  },
  checkoutButtonContainer: {
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  checkoutButton: {
    backgroundColor: Colors.theme.primary,
    width: 343,
    height: 50,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.theme.primary,
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  buttonText: {
    color: Colors.theme.light,
  },
});
