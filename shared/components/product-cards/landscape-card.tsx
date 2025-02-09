import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { CardProps } from "@/core/models";
import { Colors } from "@/core/constants";
import Button from "../button/button";

const LandscapeCard: React.FC<CardProps> = ({
  imageSource,
  title,
  price,
  onCardPress,
  onButtonPress,
  containerStyle,
  imageStyle,
  titleStyle,
  priceStyle,
  quantity,
}) => {
  
  const handleIncrementButtonPress = () => {
    // handle increment button press
    console.log("Increment Button Pressed");
  };

  const handleDecrementButtonPress = () => {
    // handle decrement button press

    console.log("Decrement Button Pressed");
  };

  const handleRemoveButtonPress = () => {
    // handle remove button press
    console.log("Remove Button Pressed");
  };

  return (
    <Pressable style={[styles.container, containerStyle]}>
      <View style={styles.imageContainer}>
        {imageSource && (
          <Image source={imageSource} style={[styles.cardImage, imageStyle]} />
        )}
      </View>

      <View style={styles.cardTextContentContainer}>
        {title && <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>}
        {price && <Text style={[styles.cardPrice, priceStyle]}>{price}</Text>}

        <View style={styles.cardQuantityCTAContainer}>
          <Button
            onButtonPress={() => handleRemoveButtonPress()}
            buttonContainer={styles.removeFromCartButton}
          >
            <Text style={styles.removeFromCartButtonText}>Remove</Text>
          </Button>

          <View style={styles.incDecrementButtonContainer}>
            <Button
              onButtonPress={() => handleDecrementButtonPress()}
              buttonContainer={styles.decrementButton}
            >
              <Text style={styles.decrementButtonText}> - </Text>
            </Button>

            <View>
              {quantity ? (
                <Text style={styles.quantity}>{quantity}</Text>
              ) : null}
            </View>

            <Button
              onButtonPress={() => handleIncrementButtonPress()}
              buttonContainer={styles.incrementButton}
            >
              <Text style={styles.incrementButtonText}> + </Text>
            </Button>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default LandscapeCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 0,
    height: 126,
    borderColor: "transparent",
    borderWidth: 0,
    maxHeight: 126,
  },

  // #region Card Image
  imageContainer: {
    marginRight: 10,
  },
  cardImage: {
    width: 134,
    height: 126,
  },
  // #endregion

  // #region Card Text Content
  cardTextContentContainer: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
    margin: 5,
  },
  cardTitle: {
    flexWrap: "wrap",
    fontSize: 14,
    fontWeight: 400,
    textTransform: "uppercase",
    fontFamily: "AGaramondProItalic",
    color: Colors.theme.primary,
    lineHeight: 20,
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
  // #endregion

  // #region CART CTAs
  cardQuantityCTAContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    flex: 1,
  },
  incDecrementButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incrementButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.theme.tertiary,
    borderRadius: 20,
    borderWidth: 1,
    padding: 0,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  incrementButtonText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Avenir",
    lineHeight: 0,
    color: Colors.theme.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    flexDirection: "row",
  },

  decrementButton: {
    width: 30,
    height: 30,
    backgroundColor: Colors.theme.tertiary,
    borderRadius: 20,
    borderWidth: 1,
    padding: 0,
    marginLeft: 0,
    justifyContent: "center",
    alignItems: "center",
  },

  decrementButtonText: {
    fontSize: 20,
    fontWeight: "400",
    fontFamily: "Avenir",
    lineHeight: 0,
    color: Colors.theme.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    margin: 0,
    flexDirection: "row",
  },

  removeFromCartButton: {
    flex: 1,
    maxWidth: 84,
    height: 30,
    backgroundColor: Colors.theme.tertiary,
    borderRadius: 80,
    borderColor: Colors.theme.primary,
    borderWidth: 2,
    padding: 0,
  },

  removeFromCartButtonText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "Avenir",
    lineHeight: 20,
    color: Colors.theme.primary,
  },

  quantity: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "GeomanistBook",
    lineHeight: 20,
    color: Colors.theme.primary,
    marginLeft: 10,
    marginRight: 10,
    marginHorizontal: "auto",
  },
  // #endregion
});
