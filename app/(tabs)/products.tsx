import {
  StyleSheet,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Alert,
} from "react-native";

import { Text, View } from "@/shared/components/Themed";
import PortraitCard from "@/shared/components/product-cards/portrait-card";
import { Colors } from "@/core/constants";
import LandscapeCard from "@/shared/components/product-cards/landscape-card";
import BasicInput from "@/shared/components/inputs/basic-input";
import Divider from "@/shared/components/divider/divider";

export default function Products() {
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Pantry by Marble</Text>
        <Text style={styles.subtitle}>Product List</Text>

        <Divider />

        <View>
          <BasicInput
            placeholder="Search for products"
            name={"Search"}
            onChange={function (value): void {
              console.log("Search Value", value);
            }}
            value={"Test Search"}
          />
        </View>

        <View>
          <PortraitCard
            imageSource={require("../../assets/images/wagyu.png")}
            imageStyle={{ borderRadius: 4 }}
            title="Pantry by Marble"
            price="$250.00"
            onCardPress={() => console.log("View Cart")}
            iconWidth={10}
            iconHeight={10}
          />
        </View>

        <View>
          <LandscapeCard
            imageSource={require("../../assets/images/wagyu.png")}
            imageStyle={{ borderRadius: 4 }}
            title="1 Whole free range chicken"
            price="$250.00"
            onCardPress={() => console.log("View Cart")}
            iconWidth={10}
            iconHeight={10}
            quantity={1}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
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
});
