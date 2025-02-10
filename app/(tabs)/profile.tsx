import { StyleSheet } from "react-native";
import { Text, View } from "@/shared/components/Themed";
import { Link, router } from "expo-router";
import { useSession } from "@/core/hooks/useSession";

export default function Profile() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text
        onPress={() => {
          signOut();
          // router.replace("/");
        }}
      >
        <Link href="/">Sign Out</Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
