
export type ProductId = string;

export interface Product {
    id: ProductId;
    name: string;
    quantity: number;
    quantityUnit: string;
    description: string;
}

export interface IProductsApi {
    getProductList: () => Promise<Product[]>;
    addProduct: (newProduct: Product) => Promise<ProductId>;
    updateProduct: (product: Product) => Promise<void>;
    removeProduct: (productId: ProductId) => Promise<void>;

    readonly supportsEvents: boolean;
}

