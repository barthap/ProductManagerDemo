import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import {RouteProp} from "@react-navigation/native";
import {Container, Content} from 'native-base';
import {useDispatch} from "react-redux";
import {productsActions} from "../core/actions/Products.actions";
import {ProductForm} from "../components/ProductForm";
import {StyleSheet} from "react-native";
import {Nav, RootStackParamList} from "../navigation/routeNames";
import analytics from "@react-native-firebase/analytics";
import {Constants} from "react-native-unimodules";
import {AppOwnership} from "expo-constants";

type AddProductStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.Edit>;
type AddProductScreenRouteProp = RouteProp<RootStackParamList, typeof Nav.Edit>;

type Props = {
    navigation: AddProductStackNavProp;
    route: AddProductScreenRouteProp;
}

export function EditProductScreen(props: Props) {
    const dispatch = useDispatch();
    const handleSubmit = (product) => {
        if(Constants.appOwnership !== AppOwnership.Expo)
            analytics().logEvent('product_edit', {product_id: product.id, product_name: product.name});
        dispatch(productsActions.updateProduct(product));
        props.navigation.navigate(Nav.Details, {product});
    };

    return (
        <Container style={styles.container}>
            <Content>
                <ProductForm onSubmit={handleSubmit} initialData={props.route.params.product} />
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
});
