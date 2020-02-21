import {Action, ActionCreator} from "redux";
import {
    ADD_PRODUCT,
    PRODUCT_CRUD_STATUS, DELETE_PRODUCT,
    LOAD_PRODUCTS,
    LOAD_PRODUCTS_STATUS,
    productConstants, UPDATE_PRODUCT
} from "../constants/products.constants";
import {Product, ProductId} from "../../api/ProductApi";


//FETCHING
export interface LoadProductsAction extends Action{
    type: LOAD_PRODUCTS;
}

export interface LoadProductsStatus extends Action{
    type: LOAD_PRODUCTS_STATUS;
    payload?: Product[];
}

const loadProducts: ActionCreator<LoadProductsAction> = () => ({
    type: productConstants.LOAD_PRODUCTS
});

const loadProductsSuccess: ActionCreator<LoadProductsStatus> = (products: Product[]) => ({
    type: productConstants.LOAD_PRODUCTS_SUCCESS,
    payload: products
});
const loadProductsPending: ActionCreator<LoadProductsStatus> = () => ({ type: productConstants.LOAD_PRODUCTS_PENDING });
const loadProductsFailure: ActionCreator<LoadProductsStatus> = () => ({ type: productConstants.LOAD_PRODUCTS_FAILURE });

//OPERATIONS
export interface AddProductAction extends Action {
    type: ADD_PRODUCT;
    payload: Product;
}
export interface UpdateProductAction extends Action {
    type: UPDATE_PRODUCT;
    payload: Product;
}
export interface DeleteProductAction extends Action {
    type: DELETE_PRODUCT;
    payload: ProductId;
}
const addProduct: ActionCreator<AddProductAction> = (product: Product) =>({
    type: productConstants.ADD_PRODUCT,
    payload: product
});
const updateProduct: ActionCreator<UpdateProductAction> = (product: Product) =>({
    type: productConstants.UPDATE_PRODUCT,
    payload: product
});
const deleteProduct: ActionCreator<DeleteProductAction> = (productId: ProductId) => ({
    type: productConstants.DELETE_PRODUCT,
    payload: productId
});

//STATUS Actions
export interface ProductCRUDStatus extends Action {
    type: PRODUCT_CRUD_STATUS;
}
const productCrudPending: ActionCreator<ProductCRUDStatus> = () => ({ type: productConstants.PRODUCTS_CRUD_PENDING });
const productCrudSuccess: ActionCreator<ProductCRUDStatus> = () => ({ type: productConstants.PRODUCTS_CRUD_SUCCESS });
const productCrudFailure: ActionCreator<ProductCRUDStatus> = () => ({ type: productConstants.PRODUCTS_CRUD_FAILURE });


export const productsActions = {
    loadProducts,
    loadProductsPending,
    loadProductsSuccess,
    loadProductsFailure,

    addProduct,
    productCrudPending,
    productCrudSuccess,
    productCrudFailure,

    updateProduct,
    deleteProduct
};
