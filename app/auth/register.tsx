import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "@/core/constants";

const Register = () => {
  return (
    <View>
      <View style={styles.headerTextContainer}>
        <Text style={styles.title}>Welcome to Pantry by Marble</Text>
        <Text style={styles.subtitle}>
          Sign up for easy payment, collection and much more
        </Text>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerTextContainer: {
    flex: 1,
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
  }
});
