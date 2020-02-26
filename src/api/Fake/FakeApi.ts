import {IProductsApi, Product, ProductId} from "../ProductApi";
import {IndexedDictionary} from "../../utils/Dictionary";
import {uuidv4} from "../../utils/Uuid";
import AsyncStorage from "@react-native-community/async-storage";
import {delay} from "../../utils/Delay";

const defaults = { quantity: 0, quantityUnit: 'szt', description: ''};

//some example data
let products = new IndexedDictionary<Product>('id', [
    { ...defaults, id: '1', name: "Bread" },
    { ...defaults, id: '2', name: "Butter" },
    { ...defaults, id: '3', name: "Meat", quantity: 1, quantityUnit: 'kg', description: 'Beef or pork'},
    { ...defaults, id: '4', name: "Eggs", quantity: 8 },
    { ...defaults, id: '5', name: "Milk", quantity: 2, quantityUnit: 'L', description: '3.5% fat'}
]);

/**
 * For the first time (AsyncStorage has no products) - set it to default value
 * If storage already has products - load them
 */
async function getFromStorage(): Promise<IndexedDictionary<Product>> {
    const res = await AsyncStorage.getItem('products');
    if(res == null)
        await updateStorage();
    else
        products = new IndexedDictionary<Product>('id', JSON.parse(res));

    return products;
}
async function updateStorage() {
    await AsyncStorage.setItem('products', JSON.stringify(products.Values()));
}

export default class FakeApi implements IProductsApi {
    readonly supportsEvents = false;    //this api does not support events
                                        //so each update must be maintained manually by updating Redux store,
                                        //or by requesting a new data from Api

    async getProductList(): Promise<Product[]> {
        await delay(2000); //simulate loading by 2s delay
        const result = await getFromStorage();
        return Promise.resolve(result.Values());
    }

    async addProduct(newProduct: Product): Promise<ProductId> {
        newProduct.id = uuidv4();
        products = products.Set(newProduct);
        await updateStorage();
        return Promise.resolve(newProduct.id);
    }

    async updateProduct(product: Product): Promise<void> {
        if(!products.ContainsIndex(product.id))
            return Promise.reject('ID not found');

        products = products.Set(product);
        await updateStorage();
        return Promise.resolve();
    }

    async removeProduct(productId: ProductId): Promise<void> {
        products = products.Remove(productId);
        await updateStorage();
        return Promise.resolve();
    }
}
