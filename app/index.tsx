import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";

import { Colors } from "@/core/constants";
import BasicInput from "@/shared/components/inputs/basic-input";
import Divider from "@/shared/components/divider/divider";
import { useAuthStore } from "@/core/state";
import { User } from "@/core/models";
import Button from "@/shared/components/button/button";

const SignUp = () => {
  // With more time I could use the UseForm hook to simplify and make this more DRY
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  let AppName = "Pantry by Marble";

  const { signUp } = useAuthStore();

  const handleSignUp = () => {
    let user: User = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phoneNumber,
    };

    if (!fullName || !email || !password || !phoneNumber) {
      // NB: can perform even more complex validations here
      Alert.alert("Please fill all the fields");
      return;
    }

    signUp(user);
    router.navigate("/(tabs)/products");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>{AppName}</Text>
      </View>

      <Text style={styles.subtitle}>
        Sign up for easy payment, collection and much more
      </Text>

      <View style={styles.dividerContainer}>
        <Divider backgroundColor={Colors.theme.primary} />
      </View>

      <View style={styles.inputContainer}>
        <BasicInput
          iconName="cross"
          placeholder="Full Name"
          onChange={setFullName}
          value={fullName}
        />
      </View>
      <View style={styles.inputContainer}>
        <BasicInput
          iconName="cross"
          placeholder="Email"
          onChange={setEmail}
          value={email}
        />
      </View>
      <View style={styles.inputContainer}>
        <BasicInput
          iconName="cross"
          placeholder="Mobile Number"
          onChange={setPhoneNumber}
          value={phoneNumber}
        />
      </View>
      <View style={styles.inputContainer}>
        <BasicInput
          iconName="hide"
          placeholder="Password"
          onChange={setPassword}
          value={password}
        />
      </View>

      <View style={styles.inputContainer}>
        <Button buttonStyles={styles.buttonStyles} onButtonPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.bodyText}>Have an account?</Text>
        <Link
          style={[
            styles.bodyText,
            {
              fontWeight: "bold",
              marginLeft: 5,
            },
          ]}
          href={"/(tabs)/products"}
        >
          Login
        </Link>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingVertical: 20,
        }}
      >
        <View
          style={{
            borderColor: Colors.theme.primary,
            borderWidth: 1,
            height: 1,
            flex: 1,
          }}
        ></View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 14,
            color: Colors.theme.primary,
            marginHorizontal: 20,
          }}
        >
          or
        </Text>
        <View
          style={{
            borderColor: Colors.theme.primary,
            borderWidth: 1,
            height: 1,
            flex: 1,
          }}
        ></View>
      </View>

      <View style={styles.inputContainer}>
        <Button buttonStyles={styles.buttonStyles}>
          <Text style={styles.buttonText}>Explore our app</Text>
        </Button>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.termsAndPolicyText}>
          By sigining up you agree to our,
        </Text>
        <Link href={"/+not-found"} style={styles.linkText}>
          Terms, Data Policy,
        </Link>
        <Text style={styles.termsAndPolicyText}>and</Text>
        <Link href={"/+not-found"} style={styles.linkText}>
          Cookie Policy
        </Link>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
    backgroundColor: Colors.theme.light,
  },
  dividerContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
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
  },
  inputContainer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    color: Colors.theme.primary,
  },
  buttonStyles: {
    backgroundColor: Colors.theme.primary,
    width: 343,
    height: 50,
    borderRadius: 80,
    borderWidth: 2,
    borderColor: Colors.theme.primary,
    paddingTop: 5,
    paddingRight: 20,
    paddingBottom: 5,
    paddingLeft: 20,
  },
  buttonText: {
    color: Colors.theme.light,
  },
  textContainer: {
    width: "100%",
    marginVertical: 20,
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  bodyText: {
    color: Colors.theme.primary,
    fontSize: 14,
  },
  termsAndPolicyText: {
    color: Colors.theme.primary,
    fontSize: 12,
  },
  linkText: {
    fontWeight: "bold",
    color: Colors.theme.primary,
    fontSize: 12,
    marginHorizontal: 2,
    marginVertical: "auto",
  },
});
