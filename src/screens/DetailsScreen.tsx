import React from "react";
import {View, Text, Button, StyleSheet, Alert} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import {Container, Content, H1, H2, Icon} from "native-base";
import {useDispatch} from "react-redux";
import {productsActions} from "../core/actions/products.actions";
import {MessageBox} from "../components/MessageBox";
import {Nav, RootStackParamList} from "../navigation/routeNames";

type DetailsStackNavProp = StackNavigationProp<RootStackParamList, typeof Nav.Details>;
type DetailsScreenRouteProp = RouteProp<RootStackParamList, typeof Nav.Details>;

type Props = {
    navigation: DetailsStackNavProp;
    route: DetailsScreenRouteProp;
}

export function DetailsScreen(props: Props) {
    const product = props.route.params.product;

    const dispatch = useDispatch();
    const handleDeleteBtnClick = () => {
        Alert.alert(
            'Confirm',
            'Do you really want to delete ' + product.name + '?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancelled deletion'),
                    style: "cancel"
                },
                {
                    text: 'Yes',
                    onPress: () => {
                        dispatch(productsActions.deleteProduct(product.id));
                        props.navigation.goBack();
                    },
                    style: "destructive"
                }
        ]);
    };

    props.navigation.setOptions({
        headerRight: ({tintColor}) => ( <View style={styles.iconContainer}>
            <Icon name="edit"
                  type="FontAwesome"
                  style={styles.icon}
                  color={tintColor}
                  onPress={() => props.navigation.navigate(Nav.Edit, {product})}/>
            <Icon name="delete"
                  type="MaterialIcons"
                  style={styles.icon}
                  color={tintColor}
                  onPress={handleDeleteBtnClick}/>
            </View>
        )
    });

    let quantityInfo = 'N/A';
    if(product.quantity != null && product.quantityUnit != null)
        quantityInfo = [product.quantity, product.quantityUnit].join(' ');

    return (
        <Container>
            <Content style={styles.text}>
                <H1 style={styles.text}>Product details: {product.name}</H1>
                <H2 style={styles.text}>Quantity: {quantityInfo}</H2>
                <Text style={styles.text}>Description: {product.description || 'N/A'}</Text>
            </Content>
            <MessageBox/>
        </Container>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    text: {
        padding: 10
    },
    icon: {
        paddingRight: 15,
    },
    iconContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: 100
    }
});
