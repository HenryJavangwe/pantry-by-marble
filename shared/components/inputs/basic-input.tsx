import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { InputProps } from "@/core/models";
import { Colors } from "@/core/constants";

import Close from "../../../assets/icons/cross.svg";
import Search from "../../../assets/icons/search.svg";
import Hide from "../../../assets/icons/hide.svg";

const BasicInput = ({
  placeholder,
  onChange,
  iconName,
  keyboardType,
  errorMessage,
  onBlur,
}: InputProps) => {
  const [value, setValue] = useState<string>("");
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(false);

  const handleChange = (value: string) => {
    setValue(value);

    if (onChange) {
      onChange(value);
    }
  };
  const handleClear = () => {
    setValue("");
    if (onChange) {
      onChange("");
    }
  };

  const handleHide = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(newText) => handleChange(newText)}
          placeholder={placeholder}
          defaultValue={value}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          onBlur={onBlur}
        />

        <Pressable onPress={iconName === "hide" ? handleHide : handleClear}>
          {iconName === "cross" && (
            <Close fill={Colors.theme.primary} width={14} height={14} />
          )}
          {iconName === "search" && (
            <Search fill={Colors.theme.primary} width={14} height={14} />
          )}
          {iconName === "hide" && (
            <Hide fill={Colors.theme.primary} width={14} height={14} />
          )}
        </Pressable>
      </View>

      {errorMessage && (
        <View>
          <Text style={{ color: Colors.theme.error }}>{errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default BasicInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "transparent",
    borderWidth: 1,
    borderBottomColor: Colors.theme.primary,
    borderBottomWidth: 1,
    paddingRight: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 10,
    color: Colors.theme.primary,
    fontFamily: "AGaramondProBold",
    fontWeight: "600",
  },
});
