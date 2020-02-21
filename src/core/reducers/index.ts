import {combineReducers} from "redux";
import productsReducer from "./ProductsReducer";
import messageBoxReducer from "./MessageBoxReducer";

const rootReducer = combineReducers({
    products: productsReducer,
    messageBox: messageBoxReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
