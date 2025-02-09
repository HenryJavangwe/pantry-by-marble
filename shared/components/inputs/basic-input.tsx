import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import React, { useState } from "react";
import { InputProps } from "@/core/models";
import { Colors } from "@/core/constants";

const BasicInput = ({ name, placeholder, onChange }: InputProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (value: string) => {
    console.log("input value", value);

    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={(newText) => handleChange(newText)}
        placeholder={placeholder}
        defaultValue={value}
      />
    </View>
  );
};

export default BasicInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderWidth: 1,
    borderBottomColor: Colors.theme.primary,
    borderBottomWidth: 1,
    padding: 10,
    margin: 10,
    color: Colors.theme.primary,
    fontFamily: "AGaramondProBold",
    fontWeight: "600",
  },
});
