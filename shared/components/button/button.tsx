import { StyleSheet, Pressable } from "react-native";
import React, { Children } from "react";
import { ButtonProps } from "@/core/models/button";

const Button = ({ buttonStyles, onButtonPress, children }: ButtonProps) => {
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    }
  };

  return (
    <Pressable
      onPress={handleButtonPress}
      style={({ pressed }) => [
        styles.container,
        buttonStyles,
        pressed && { opacity: 0.8 },
      ]}
    >
      {Children.map(children, (child) => child)}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderRadius: 80,
  },
});
