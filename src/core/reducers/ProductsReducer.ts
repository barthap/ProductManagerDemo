import {Product} from "../../api/ProductApi";
import {Reducer} from "redux";
import {productConstants} from "../constants/products.constants";

export interface IProductsState {
    products: Product[];
    isFetching: boolean;
    isCrudPending: boolean;
    isError: boolean;
}

const initialState: IProductsState = {
    isCrudPending: false, isError: false, isFetching: false, products: []
};

const productsReducer: Reducer<IProductsState> = (state = initialState, action) => {
    switch (action.type) {
        case productConstants.LOAD_PRODUCTS_PENDING:
            return {...state, isFetching: true, isError: false };
        case productConstants.LOAD_PRODUCTS_SUCCESS:
            return {...state, isFetching: false, products: action.payload };
        case productConstants.LOAD_PRODUCTS_FAILURE:
            return {...state, isFetching: false, isError: true };

        case productConstants.PRODUCTS_CRUD_SUCCESS:
            return {...state, isCrudPending: false };
        case productConstants.PRODUCTS_CRUD_PENDING:
            return {...state, isCrudPending: true, isError: false };
        case productConstants.PRODUCTS_CRUD_FAILURE:
            return {...state, isCrudPending: false, isError: true };
        default:
            return state;
    }
};

export default productsReducer;
