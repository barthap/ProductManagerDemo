import {IProductsState} from "../core/reducers/ProductsReducer";
import {typedUseSelector} from "./typedUseSelector";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {productsActions} from "../core/actions/products.actions";
import {messageBoxActions} from "../core/actions/MessageBox.actions";
import i18n from "../i18n";

//example custom hook.
//for real it is too simple to make it custom, but
//it is made for demo purposes only
export function useProducts(reload: boolean = true): [IProductsState, () => void] {
    const state: IProductsState = typedUseSelector(s => s.products);
    const dispatch = useDispatch();
    const dispatchReload = () => dispatch(productsActions.loadProducts());

    useEffect(() => {
        if(reload) {
            dispatchReload();
            dispatch(messageBoxActions.show(i18n.t('alerts.loading'), 'info', false));
        }

    }, []);

    return [state, dispatchReload];
}
