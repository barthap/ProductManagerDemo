import 'react-native-gesture-handler';
import React, {useEffect} from "react";
import {StyleSheet, View, Text} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {ProductList} from "../components/ProductList";
import {Product} from "../api/ProductApi";
import {useProducts} from "../hooks/useProducts";
import {Container, Icon} from 'native-base';
import {MessageBox} from "../components/MessageBox";
import {Nav, RootStackParamList} from "../navigation/routeNames";
import i18n from '../i18n';
import analytics from "@react-native-firebase/analytics";
import {Constants} from "react-native-unimodules";
import {AppOwnership} from "expo-constants";
import {useComponentLifecycleLog} from "../hooks/useComponentLifecycleLog";

type ProductListStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.ProductList>;
type Props = {
    navigation: ProductListStackNavProp;
}

function NoItemsMessage(props: {handleRefresh: () => void}) {
    return <View style={styles.messageContainer}>
        <Text style={styles.messageText} >{i18n.t('list.empty')}</Text>
        <Icon name='ios-refresh' onPress={props.handleRefresh} style={styles.refreshIcon} fontSize={20}/>
        <Text style={styles.secondaryText}>Click to refresh</Text>
    </View>;
}
export function ProductListScreen(props: Props) {
    useComponentLifecycleLog('Product Lists');
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
        {noProducts ? <NoItemsMessage handleRefresh={reload}/> :
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
    },
    refreshIcon: {
        paddingTop: 20,
        fontSize: 50
    },
    secondaryText: {
        fontSize: 12,
        color: '#555'
    }
});
