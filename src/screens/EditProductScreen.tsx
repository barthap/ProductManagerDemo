import React from "react";
import { RouteProp } from "@react-navigation/native";
import { Container, Content } from "native-base";
import { useDispatch } from "react-redux";
import { productsActions } from "../core/actions/Products.actions";
import { ProductForm } from "../components/ProductForm";
import { StyleSheet } from "react-native";
import { Nav, RootStackParamList } from "../navigation/routeNames";
import analytics from "@react-native-firebase/analytics";
import { AppOwnership } from "expo-constants";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Product } from "../api/ProductApi";

type AddProductStackNavProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof Nav.Edit
>;
type AddProductScreenRouteProp = RouteProp<RootStackParamList, typeof Nav.Edit>;

type Props = {
  navigation: AddProductStackNavProp;
  route: AddProductScreenRouteProp;
};

export function EditProductScreen(props: Props) {
  const dispatch = useDispatch();
  const handleSubmit = (product: Product) => {
    analytics().logEvent("product_edit", {
      product_id: product.id,
      product_name: product.name,
    });
    dispatch(productsActions.updateProduct(product));
    props.navigation.navigate(Nav.Details, { product });
  };

  return (
    <Container style={styles.container}>
      <Content>
        <ProductForm
          onSubmit={handleSubmit}
          initialData={props.route.params.product}
        />
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
});
