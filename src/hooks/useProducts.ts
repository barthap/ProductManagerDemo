import {IProductsState} from "../core/reducers/ProductsReducer";
import {typedUseSelector} from "../utils/typedUseSelector";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {productsActions} from "../core/actions/products.actions";

//example custom hook.
//for real it is too simple to make it custom, but
//it is made for demo purposes only
export function useProducts(reload: boolean = true) {
    const state: IProductsState = typedUseSelector(s => s.products);
    const dispatch = useDispatch();

    useEffect(() => {
        if(reload) dispatch(productsActions.loadProducts());

    }, []);

    return state;
}
