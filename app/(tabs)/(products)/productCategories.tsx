import React from "react";
import { StyleSheet, ScrollView, Pressable } from "react-native";
import { Text, View } from "@/shared/components/Themed";
import { Colors } from "@/core/constants";
import Divider from "@/shared/components/divider/divider";
import { ProductCategory } from "@/core/models";
import { router } from "expo-router";

export default function productCategories() {
  let ProductCategoryList = Object.values(ProductCategory);
  const handleNavigateToCategory = (categoryId: string) => {
    router.push(`/(tabs)/(products)/${categoryId}`);
  };

  // const { data, isLoading, error, refetch } = useFetchData('/api/data');

  //   if (isLoading) {
  //     return <Text>Loading...</Text>;
  //   }

  //   if (error) {
  //     return <Text>Error: {error.message}</Text>;
  //   }

  //   return (
  //     <View>
  //       {data && <Text>{JSON.stringify(data)}</Text>}
  //       <Button title="Refetch" onPress={refetch} />
  //     </View>
  //   );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleTextContainer}>
        <Text style={styles.title}>Explore our pantry</Text>
      </View>

      <View style={styles.dividerContainer}>
        <Divider backgroundColor={Colors.theme.primary} />
      </View>

      <View style={styles.categoryBoxContainer}>
        {ProductCategoryList?.map((category) => (
          <Pressable
            onPress={() => handleNavigateToCategory(category)}
            style={styles.categoryBox}
            key={category}
          >
            <Text key={category} style={styles.categoryText}>
              {category}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.theme.light,
  },
  titleTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dividerContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  categoryBox: {
    borderRadius: 20,
    height: 150,
    minWidth: 150,
    flex: 1,
    padding: 10,
    margin: 5,
    backgroundColor: Colors.theme.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryText: {
    fontSize: 28,
    fontWeight: "900",
    fontFamily: "AGaramondProBold",
    color: Colors.theme.light,
  },
});
