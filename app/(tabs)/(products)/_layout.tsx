import { Colors } from "@/core/constants";
import Button from "@/shared/components/button/button";
import { Stack, router } from "expo-router";
import { Alert, Text, View } from "react-native";

import Filter from "../../../assets/icons/filter.svg";

export default function Layout() {
  return (
    <Stack initialRouteName="productCategories">
      <Stack.Screen
        name="productCategories"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: Colors.theme.primary,
          title: "",
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="[categoryId]"
        options={{
          headerBackButtonDisplayMode: "minimal",
          headerTintColor: Colors.theme.primary,
          title: "",
          headerShadowVisible: false,
          headerRight: () => (
            <Button
              onButtonPress={() => {
                Alert.alert("Data has been filtered by selected filters");
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  maxWidth: 60,
                }}
              >
                <Text style={{ color: Colors.theme.primary, marginRight: 10 }}>
                  Filter
                </Text>
                <Filter fill={Colors.theme.primary} height={16} width={16} />
              </View>
            </Button>
          ),
        }}
      />
    </Stack>
  );
}
