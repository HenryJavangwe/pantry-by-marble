import React from "react";
import { StyleSheet, Pressable, FlatList } from "react-native";
import { Text, View } from "@/shared/components/Themed";
import PortraitCard from "@/shared/components/product-cards/portrait-card";
import { Colors } from "@/core/constants";
import { useLocalSearchParams } from "expo-router";
import Divider from "@/shared/components/divider/divider";
import { Product, ProductSubCategory } from "@/core/models";
import { useEffect, useState } from "react";
import { useFetchData } from "@/core/hooks";
import { useCartStore } from "@/core/state";

// #region Filters
const Filters = ({
  filters,
  onFilterChange,
}: {
  filters: string[];
  onFilterChange: (filters: string[]) => void;
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"]);

  const handleFilterChange = (filter: string) => {
    let newFilters = ["All"];
    if (filter === "All") {
      newFilters = ["All"];
    } else {
      newFilters = selectedFilters.includes(filter)
        ? selectedFilters.filter((f) => f !== filter)
        : [...selectedFilters.filter((f) => f !== "All"), filter];
    }
    setSelectedFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {filters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => handleFilterChange(filter)}
          style={{ margin: 5 }}
        >
          <Text
            style={{
              color: selectedFilters.includes(filter)
                ? Colors.theme.grey
                : Colors.theme.primary,
              fontSize: 14,
              fontFamily: "Avenir",
              fontWeight: "800",
            }}
          >
            {filter}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

// #endregion

export default function ProductCategoryList() {
  const { categoryId } = useLocalSearchParams();
  const filters = ["All", ...Object.values(ProductSubCategory)];

  const { addToCart } = useCartStore();

  const { data, isLoading, error } = useFetchData<Product[]>("fetchMockData");
  const [filteredData, setFilteredData] = useState<Product[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredData(data);
    }
  }, [data]);

  const handleFilterChange = (selectedFilters: string[]) => {
    if (!data) return;
    if (selectedFilters.includes("All")) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((product) => selectedFilters.includes(product.subCategory))
      );
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{categoryId ? categoryId : "Meat"}</Text>
      </View>
      <View style={styles.dividerContainer}>
        <Divider backgroundColor={Colors.theme.primary} />
      </View>
      <Filters filters={filters} onFilterChange={handleFilterChange} />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.bodyText}>Based on your selection</Text>
        <Text style={styles.subtitle}>Our products</Text>
      </View>

      <FlatList
        data={filteredData}
        contentContainerStyle={styles.productsContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <PortraitCard
            imageStyle={{ borderRadius: 4 }}
            product={item}
            onCardPress={() => handleAddToCart(item)}
            iconWidth={10}
            iconHeight={10}
            key={item.id}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.theme.light,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    fontFamily: "AGaramondProBold",
    color: Colors.theme.primary,
  },
  subtitle: {
    fontSize: 30,
    fontWeight: "700",
    fontFamily: "AGaramondProBold",
    color: Colors.theme.primary,
    marginTop: 8,
  },
  dividerContainer: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    color: Colors.theme.primary,
    fontSize: 14,
  },
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    width: "100%",
  },
});
