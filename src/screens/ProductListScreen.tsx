import 'react-native-gesture-handler';
import React from "react";
import {StyleSheet, View, Text} from "react-native";
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

function NoItemsMessage() {
    return <View style={styles.messageContainer}>
        <Text style={styles.messageText} >Product list is empty, add one</Text>
    </View>;
}
export function ProductListScreen(props: Props) {

    //custom hook that loads product list
    const [data, reload] = useProducts(true);

    const handleItemClick = (product: Product) => {
        props.navigation.navigate(Nav.Details, {
            product: product
        });
    };

    const noProducts = data.products.length === 0 && !data.isFetching;

    return <Container style={styles.container}>
        {noProducts ? <NoItemsMessage/> :
            <ProductList items={data.products}
                     onItemClick={handleItemClick}
                     onRefresh={reload} refreshing={data.isFetching}
            />
        }
        <MessageBox/>
    </Container>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10
    },
    messageContainer: {
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
    },
    messageText: {
        fontSize: 15
    }
});
