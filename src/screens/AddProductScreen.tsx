import React from "react";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {useProducts} from "../hooks/useProducts";
import {Text, Container, Content} from 'native-base';
import {useDispatch} from "react-redux";
import {productsActions} from "../core/actions/Products.actions";
import {ProductForm} from "../components/ProductForm";
import {StyleSheet} from "react-native";
import {Nav, NavType, RootStackParamList} from "../navigation/routeNames";

type AddProductStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.Add>;
type AddProductScreenRouteProp = RouteProp<RootStackParamList, typeof Nav.Add>;

type Props = {
    navigation: AddProductStackNavProp;
}

export function AddProductScreen(props: Props) {
    const dispatch = useDispatch();
    const handleSubmit = (product) => {
        dispatch(productsActions.addProduct(product));
        props.navigation.goBack();
    };

    return (
        <Container style={styles.container}>
            <Content>
                <ProductForm onSubmit={handleSubmit} />
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
});
