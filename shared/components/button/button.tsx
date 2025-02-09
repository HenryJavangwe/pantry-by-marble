import { StyleSheet, Text, Pressable } from "react-native";
import React, { Children } from "react";
import { ButtonProps } from "@/core/models/button";

const Button = ({ buttonContainer, onButtonPress, children }: ButtonProps) => {
  // handle button press
  const handleButtonPress = () => {
    if (onButtonPress) {
      onButtonPress();
    }
  };

  return (
    <Pressable
      onPress={handleButtonPress}
      style={[styles.container, buttonContainer]}
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
