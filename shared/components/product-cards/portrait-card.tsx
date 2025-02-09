import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import Cart from "../../../assets/icons/cart.svg";
import { CardProps } from "@/core/models";
import { Colors } from "@/core/constants";

const PortraitCard: React.FC<CardProps> = ({
  imageSource,
  title,
  price,
  onCardPress,
  containerStyle,
  imageStyle,
  titleStyle,
  priceStyle,
  iconWidth,
  iconHeight,
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        containerStyle,
        pressed && { opacity: 0.8 },
      ]}
    >
      {imageSource && (
        <Image source={imageSource} style={[styles.cardImage, imageStyle]} />
      )}

      {title && <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>}

      {price && (
        <View style={styles.cardPriceContainer}>
          <Text style={[styles.cardPrice, priceStyle]}>{price}</Text>
          <Pressable onPress={onCardPress} style={[styles.cartIconWrapper]}>
            <Cart
              fill={Colors.theme.primary}
              width={iconWidth}
              height={iconHeight}
            />
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default PortraitCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    padding: 0,
    width: 163,
    height: 247,
    borderColor: "transparent",
    borderWidth: 0,
  },
  cardImage: {
    width: 163,
    height: 163,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: "Avenir",
    lineHeight: 20,
    marginTop: 10,
  },
  cardPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 14,
    fontWeight: "900",
    fontFamily: "Avenir",
    lineHeight: 20,
    color: Colors.theme.primary,
    flex: 1,
  },
  cartIconWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "transparent",
    borderColor: Colors.theme.primary,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    borderWidth: 1,
    borderRadius: 16,
    marginRight: 10,
  },
});
