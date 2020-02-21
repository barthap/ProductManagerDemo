import {IProductsState} from "../core/reducers/ProductsReducer";
import {typedUseSelector} from "./typedUseSelector";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {productsActions} from "../core/actions/products.actions";

//example custom hook.
//for real it is too simple to make it custom, but
//it is made for demo purposes only
export function useProducts(reload: boolean = true): [IProductsState, () => void] {
    const state: IProductsState = typedUseSelector(s => s.products);
    const dispatch = useDispatch();
    const dispatchReload = () => dispatch(productsActions.loadProducts());

    useEffect(() => {
        if(reload) dispatchReload();

    }, []);

    return [state, dispatchReload];
}
