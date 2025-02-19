import { ActivityIndicator, StyleSheet, View } from "react-native";
import React from "react";

interface LoadingSpinnerProps {
  color?: string;
  size?: number;
}

const LoadingSpinner = ({ color, size }: LoadingSpinnerProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
