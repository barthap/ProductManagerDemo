import 'react-native-gesture-handler';
import React from "react";
import {Text, StyleSheet} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ProductList} from "../components/ProductListComponents";
import {Product} from "../api/ProductApi";
import {useProducts} from "../hooks/useProducts";
import {Container} from 'native-base';
import {MessageBox} from "../components/MessageBox";
import {Nav, RootStackParamList} from "../navigation/routeNames";

type ProductListStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.ProductList>;
type Props = {
    navigation: ProductListStackNavProp;
}

export function ProductListScreen(props: Props) {

    //custom hook that loads product list
    const data = useProducts(true);

    const handleItemClick = (product: Product) => {
        props.navigation.navigate(Nav.Details, {
            product: product
        });
    };

    return <Container style={styles.container}>
        {data.isFetching && <Text>Loading...</Text>}
        <ProductList items={data.products} onItemClick={handleItemClick}/>
        <MessageBox/>
    </Container>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    }
});
