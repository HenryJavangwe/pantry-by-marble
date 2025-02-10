import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/core/constants";

const Divider = ({ backgroundColor }: { backgroundColor?: string }) => {
  return <View style={[styles.container, { backgroundColor }]} />;  
};

export default Divider;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,

    width: 343,
    height: 15,
    backgroundColor: Colors.theme.primary,
  },
});
