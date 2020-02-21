import firestore from './firestoreProvider';
import {IProductsApi, Product, ProductId} from "../ProductApi";
import {ApiEventListener } from "../EventApi";
import {FirestoreEventManager, QueryDocSnapshot} from "./EventApi";

//TODO: Rename to "ProductsApi"
export class FirestoreProductsApi implements IProductsApi {
    private ref = firestore().collection('products');

    async addProduct (newProduct: Product) {
        const data = {...newProduct};
        delete data.id; //Firestore will create its own id
        const result = await this.ref.add(data);
        console.log('added', newProduct, 'with id ', result.id);
        return result.id;
    }

    async getProductList(): Promise<Product[]> {
        const querySnapshot = await this.ref.get();

        console.log('Total Products', querySnapshot.size);

        // @ts-ignore
        const result: Product[] = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        return Promise.resolve(result);
    }
    async removeProduct(productId: ProductId) {
        if(productId == null || typeof productId !== "string")
            throw "Product ID must be string when using Firestore";

        return this.ref.doc(productId).delete();
    }
    async updateProduct(product: Product) {
        if(product.id == null || typeof product.id != "string")
            throw "Invalid Product ID: " + product.id;

        const data = {...product};
        delete data.id;
        return this.ref.doc(product.id).set(data);
    }

    readonly supportsEvents = true;  //events are supported
}

export type ProductCollectionListener = ApiEventListener<Product[]>;

export class FirestoreProductEventManager extends FirestoreEventManager<Product> {
    constructor() {
        super('products');
    }

    protected parseDoc(doc: QueryDocSnapshot): Product {
        // @ts-ignore
        return {
            id: doc.id,
            ...doc.data()
        };
    }
}
