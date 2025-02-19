import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Link, router } from "expo-router";

import { Colors, InputErrorMessage } from "@/core/constants";
import BasicInput from "@/shared/components/inputs/basic-input";
import Divider from "@/shared/components/divider/divider";
import { useAuthStore } from "@/core/state";
import { User } from "@/core/models";
import Button from "@/shared/components/button/button";
import LoadingSpinner from "@/shared/components/loading-spinner";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  let AppName = "Pantry by Marble";

  const { signUp } = useAuthStore();

  const validateEmail = (email: string) => {
    const emailRegex =
      /^[a-zA-Z0-9+]+[a-zA-Z0-9._+]+@[a-zA-Z0-9]+\.[a-zA-Z.]{2,5}$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phone: string) => {
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]|^\d{6,14}$/;
    return phoneRegex.test(phone);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleValidation = (value: string, name: string) => {
    let errorMessage = "";

    if (!value) {
      errorMessage = InputErrorMessage.required;
    } else {
      switch (name) {
        case "email":
          if (!validateEmail(value)) {
            errorMessage = InputErrorMessage.Email;
          }
          break;
        case "phone":
          if (!validatePhoneNumber(value)) {
            errorMessage = InputErrorMessage.phone;
          }
          break;
        case "password":
          if (!validatePassword(value)) {
            errorMessage = InputErrorMessage.password;
          }
          break;
        default:
          break;
      }
    }

    setError((prevError) => ({ ...prevError, [name]: errorMessage }));
  };

  const handleSignUp = () => {
    handleValidation(fullName, "fullName");
    handleValidation(email, "email");
    handleValidation(phoneNumber, "phone");
    handleValidation(password, "password");

    const hasErrors = Object.values(error).some((message) => message !== "");

    if (hasErrors) {
      return;
    }

    setIsSubmitting(true);
    let user: User = {
      fullName: fullName,
      email: email,
      password: password,
      phone: phoneNumber,
    };

    // as part of feedback given, just added a timeout to simulate a delay and show the spinner
    setTimeout(() => {
      signUp(user);
      setIsSubmitting(false);
      router.navigate("/(tabs)/(products)/productCategories");
    }, 1000);
  };

  if (isSubmitting) {
    return <LoadingSpinner color={Colors.theme.primary} />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView style={styles.scrollContainer}>
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
            errorMessage={error.fullName}
            value={fullName}
            onBlur={() => handleValidation(fullName, "fullName")}
          />
        </View>
        <View style={styles.inputContainer}>
          <BasicInput
            iconName="cross"
            placeholder="Email"
            onChange={setEmail}
            errorMessage={error.email}
            value={email}
            keyboardType="email-address"
            onBlur={() => handleValidation(email, "email")}
          />
        </View>
        <View style={styles.inputContainer}>
          <BasicInput
            iconName="cross"
            placeholder="Mobile Number"
            onChange={setPhoneNumber}
            errorMessage={error.phone}
            value={phoneNumber}
            keyboardType="phone-pad"
            onBlur={() => handleValidation(phoneNumber, "phone")}
          />
        </View>
        <View style={styles.inputContainer}>
          <BasicInput
            iconName="hide"
            placeholder="Password"
            onChange={setPassword}
            errorMessage={error.password}
            value={password}
            onBlur={() => handleValidation(password, "password")}
          />
        </View>

        <View style={styles.inputContainer}>
          <Button
            buttonStyles={styles.buttonStyles}
            onButtonPress={handleSignUp}
          >
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
            href={"/(tabs)/(products)/productCategories"}
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
            By signing up you agree to our,
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
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.theme.light,
  },
  scrollContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "transparent",
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
