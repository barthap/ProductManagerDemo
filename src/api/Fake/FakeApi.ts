import {IProductsApi, Product, ProductId} from "../ProductApi";
import {IndexedDictionary} from "../../utils/Dictionary";

const defaults = { quantity: 0, quantityUnit: 'szt', description: ''};

let products = new IndexedDictionary<Product>('id', [
    { id: '1', name: "Chleb", ...defaults},
    { id: '2', name: "Masło", ...defaults},
    { id: '3', name: "Szynka", ...defaults},
    { id: '4', name: "Jajka", ...defaults},
    { id: '5', name: "Mleko", ...defaults}
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
