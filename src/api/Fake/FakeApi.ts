import {IProductsApi, Product, ProductId} from "../ProductApi";
import {IndexedDictionary} from "../../utils/Dictionary";
import {uuidv4} from "../../utils/Uuid";

const defaults = { quantity: 0, quantityUnit: 'szt', description: ''};

//some example data
let products = new IndexedDictionary<Product>('id', [
    { id: '1', name: "Bread", ...defaults},
    { id: '2', name: "Butter", ...defaults},
    { id: '3', name: "Meat", quantity: 1, quantityUnit: 'kg', description: 'Beef or pork'},
    { ...defaults, id: '4', name: "Eggs", quantity: 8 },
    { id: '5', name: "Milk", quantity: 2, quantityUnit: 'L', description: '3.5% fat'}
]);

export default class FakeApi implements IProductsApi {
    readonly supportsEvents = false;    //this api does not support events
                                        //so each update must be maintained manually by updating Redux store,
                                        //or by requesting a new data from Api

    async getProductList(): Promise<Product[]> {
        return new Promise((resolve) => {
            //simulate loading by 2s delay
            setTimeout(() => resolve(products.Values()), 2000);
        });
    }

    async addProduct(newProduct: Product): Promise<ProductId> {
        newProduct.id = uuidv4();
        products = products.Set(newProduct);
        return Promise.resolve(newProduct.id);
    }

    async updateProduct(product: Product): Promise<void> {
        if(!products.ContainsIndex(product.id))
            return Promise.reject('ID not found');

        products = products.Set(product);
        return Promise.resolve();
    }

    async removeProduct(productId: ProductId): Promise<void> {
        products = products.Remove(productId);
        return Promise.resolve();
    }
}
