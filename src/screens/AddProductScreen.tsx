import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { Container, Content } from 'native-base';
import { useDispatch } from 'react-redux';
import { productsActions } from '../core/actions/Products.actions';
import { ProductForm } from '../components/ProductForm';
import { StyleSheet } from 'react-native';
import { Nav, RootStackParamList } from '../navigation/routeNames';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../api/ProductApi';

type AddProductStackNavProp = NativeStackNavigationProp<RootStackParamList, typeof Nav.Add>;
type AddProductScreenRouteProp = RouteProp<RootStackParamList, typeof Nav.Add>;

type Props = {
  navigation: AddProductStackNavProp;
  route: AddProductScreenRouteProp;
};

export function AddProductScreen(props: Props) {
  const dispatch = useDispatch();
  const handleSubmit = (product: Product) => {
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
    padding: 15,
  },
});
