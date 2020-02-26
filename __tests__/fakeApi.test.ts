import FakeApi from "../src/api/Fake/FakeApi";
import {Product} from "../src/api/ProductApi";
import AsyncStorage from "@react-native-community/async-storage";

const prod: Product = {description: "desc", id: "abc", name: "Test", quantity: 1, quantityUnit: "szt"};


it('should get items from storage', async function () {
    const api = new FakeApi();
    await api.getProductList();
    expect(AsyncStorage.getItem).toBeCalledWith('products');
});

it('should add product to storage', async function () {
    const api = new FakeApi();
    await api.addProduct(prod);
    expect(AsyncStorage.setItem).toBeCalled();

    const res = await AsyncStorage.getItem('products');
    const json = JSON.parse(res);
    expect(json).toContainEqual(prod);
});
