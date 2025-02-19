import { Colors } from "@/core/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../button/button";
import { router } from "expo-router";

const NoProductsInCart = () => {
  const handleNavigateToProducts = () => {
    router.push("/(tabs)/products");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emptyStateText}>No products in Cart</Text>
      <Button onButtonPress={() => handleNavigateToProducts()}>
        <Button
          buttonStyles={styles.checkoutButton}
          onButtonPress={() => handleNavigateToProducts()}
        >
          <Text style={styles.buttonText}>Start Shopping</Text>
        </Button>
      </Button>
    </View>
  );
};

export default NoProductsInCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyStateText: {
    fontSize: 32,
    fontWeight: "400",
    fontFamily: "AGaramondPro",
    color: Colors.theme.primary,
  },
  checkoutButton: {
    width: 343,
    height: 50,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.theme.primary,
    backgroundColor: "transparent",
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  buttonText: {
    color: Colors.theme.primary,
  },
});
