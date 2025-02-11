import { StyleSheet, ScrollView, Pressable, Alert } from "react-native";
import { Text, View } from "@/shared/components/Themed";
import PortraitCard from "@/shared/components/product-cards/portrait-card";
import { Colors } from "@/core/constants";

import { useLocalSearchParams } from "expo-router";
import Divider from "@/shared/components/divider/divider";
import { Product, ProductSubCategory } from "@/core/models";
import { useState } from "react";
import { mock_products } from "@/core/mocks/products";
import { useFetchData } from "@/core/hooks";
import { useCartStore } from "@/core/state";

// TODO: Move this to a separate component - due to time constraints I'm not able to create a separate component
const Filters = ({
  filters,
  onFilterChange,
}: {
  filters: string[];
  onFilterChange: (filter: string[]) => void;
}) => {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const handleFilterChange = (filter: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filter)) {
        return prevFilters.filter((f) => f !== filter);
      } else {
        return [...prevFilters, filter];
      }
    });

    onFilterChange(selectedFilters);
  };
  // grey out the filters that are already selected - the all filter is not greyed out if at least one other filter is not selected
  const handleFilterGreyOut = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prevFilters) =>
        prevFilters.filter((f) => f !== filter)
      );
    }
  };

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {filters.map((filter) => (
        <Pressable
          key={filter}
          onPress={() => filter !== "All" && handleFilterChange(filter)}
          style={{ margin: 5 }}
        >
          <Text
            style={{
              color:
                filter === "All" && selectedFilters.length < filters.length - 1
                  ? Colors.theme.grey
                  : selectedFilters.includes(filter)
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

export default function ProductCategoryList() {
  const { categoryId } = useLocalSearchParams();
  const filters = ["All", ...Object.values(ProductSubCategory)];

  const { addToCart } = useCartStore();

  const { data, isLoading, error, refetch } =
    useFetchData<Product[]>("fetchMockData");

  const handleFilterChange = (filter: string[]) => {
    // update data based on the selected filters
    refetch();
  };

  const handleAddToCart = (product: Product) => {
    // add the product to the cart
    addToCart(product);

    // Alert.alert(
    //   "Cart Items",
    //   JSON.stringify(useCartStore.getState().cartItems)
    // );

    console.log("Cart Items", useCartStore.getState().cartItems);
  };

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.productsContainer}>
        {data?.map((product) => (
          <PortraitCard
            imageSource={product.image}
            imageStyle={{ borderRadius: 4 }}
            title={product.name}
            price={product.price}
            onCardPress={() => handleAddToCart(product)}
            iconWidth={10}
            iconHeight={10}
            key={product.id}
          />
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

  bodyText: {
    color: Colors.theme.primary,
    fontSize: 14,
  },

  // #region products
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  // #endregion
});
