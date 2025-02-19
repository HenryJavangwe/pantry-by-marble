import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import Cart from "../../../assets/icons/cart.svg";
import { CardProps } from "@/core/models";
import { Colors } from "@/core/constants";
import { useCartStore } from "@/core/state";
import { router } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const PortraitCard: React.FC<CardProps> = ({
  onCardPress,
  containerStyle,
  imageStyle,
  titleStyle,
  priceStyle,
  iconWidth,
  iconHeight,
  product,
}) => {
  const { image: imageSource, name: title, price } = product;

  const { getProcuctQuantity } = useCartStore.getState();
  const quantity = getProcuctQuantity(product);

  // reg just show casing I can use animation - a small bounce effect for the final touch
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.9, { damping: 2, stiffness: 100 }, () => {
      scale.value = withSpring(1, { damping: 2, stiffness: 100 });
    });
    onCardPress?.();
  };

  return (
    <Animated.View style={[styles.container, containerStyle, animatedStyles]}>
      <Pressable onPress={handlePress}>
        {imageSource && (
          <Image source={imageSource} style={[styles.cardImage, imageStyle]} />
        )}

        {title && <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>}

        {price && (
          <View style={styles.cardPriceContainer}>
            <Text style={[styles.cardPrice, priceStyle]}>{price}</Text>

            <Text style={styles.quantity}>{quantity}</Text>

            <Pressable
              onPress={() => {
                router.navigate("/(tabs)/cart");
              }}
              style={[styles.cartIconWrapper]}
            >
              <Cart
                fill={Colors.theme.primary}
                width={iconWidth}
                height={iconHeight}
              />
            </Pressable>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default React.memo(PortraitCard);

const styles = StyleSheet.create({
  container: {
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
  quantity: {
    fontSize: 10,
    fontWeight: "bold",
    color: Colors.theme.primary,
    marginLeft: 5,
  },
});
