import React from 'react';
import {FlatList} from "react-native";
import {Product} from "../api/ProductApi";
import {ListItem, Text} from 'native-base';

type ProductListProps = {
    items: Array<Product>;
    onItemClick: (product: Product) => void;
    onRefresh?: () => void;
    refreshing?: boolean;
}
type ListItemProps = {
    product: Product;
    onClick: (product: Product) => void;
}

function ProductListItem(props: ListItemProps) {
    return (
        <ListItem onPress={() => props.onClick(props.product)}>
            <Text>{props.product.name}</Text>
        </ListItem>
    );
}

export function ProductList(props: ProductListProps) {
    return <FlatList data={props.items}
                     keyExtractor={(item) => item.id.toString() }
                     onRefresh={props.onRefresh} refreshing={props.refreshing}
                     renderItem={(item) =>
                         <ProductListItem product={item.item} onClick={props.onItemClick}/>
                     } />
}
