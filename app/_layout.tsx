import { Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/shared/components/useColorScheme";
import { SessionProvider } from "@/core/hooks/useSession";
import { Colors } from "@/core/constants";
import Button from "@/shared/components/button/button";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    AGaramondProBold: require("../assets/fonts/AGaramondPro-Bold.otf"),
    AGaramondProBoldItalic: require("../assets/fonts/AGaramondPro-BoldItalic.otf"),
    AGaramondProRegular: require("../assets/fonts/AGaramondPro-Regular.otf"),
    AGaramondProItalic: require("../assets/fonts/AGaramondPro-Italic.otf"),
    AvenirMedium: require("../assets/fonts/Avenir-Medium.ttf"),
    AvenirBlack: require("../assets/fonts/Avenir-Black.ttf"),
    GeomanistBook: require("../assets/fonts/Geomanist-Book.otf"),
    GeomanistLight: require("../assets/fonts/Geomanist-Light.otf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
        <RootLayoutNav />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Provide the session to the entire app */}
      <SessionProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "",
              headerBackButtonDisplayMode: "minimal",
              headerTintColor: Colors.theme.primary,
              headerRight: () => (
                <Button
                  onButtonPress={() => router.navigate("/(tabs)/products")}
                >
                  <Text style={{ color: Colors.theme.primary }}>Explore app</Text>
                </Button>
              ),
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="(tabs)"
            options={{
              title: "",
              headerBackButtonDisplayMode: "default",
              headerTintColor: Colors.theme.primary,
              headerBackTitle: "Back",
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name="modal" options={{ presentation: "modal" }} />
        </Stack>
      </SessionProvider>
    </ThemeProvider>
  );
}
