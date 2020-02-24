import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ProductList} from "../components/ProductListComponents";
import {Product} from "../api/ProductApi";
import {useProducts} from "../hooks/useProducts";
import {Container} from 'native-base';
import {MessageBox} from "../components/MessageBox";
import {Nav, RootStackParamList} from "../navigation/routeNames";
import i18n from '../i18n';
import analytics from "@react-native-firebase/analytics";
import {Constants} from "react-native-unimodules";
import {AppOwnership} from "expo-constants";

type ProductListStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.ProductList>;
type Props = {
    navigation: ProductListStackNavProp;
}

function NoItemsMessage() {
    return <View style={styles.messageContainer}>
        <Text style={styles.messageText} >{i18n.t('list.empty')}</Text>
    </View>;
}
export function ProductListScreen(props: Props) {

    //custom hook that loads product list
    const [data, reload] = useProducts(true);

    const handleItemClick = (product: Product) => {
        if(Constants.appOwnership !== AppOwnership.Expo)
            analytics().logViewItem({item_id: product.id, item_name: product.name, item_category: 'N/A'});
        props.navigation.navigate(Nav.Details, {
            product: product
        });
    };

    useEffect(()=>{
        if(Constants.appOwnership !== AppOwnership.Expo)
            analytics().logViewItemList({item_category: 'N/A'});
    }, [data.products]);

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
