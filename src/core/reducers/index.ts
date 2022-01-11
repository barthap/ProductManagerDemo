import {combineReducers} from "redux";
import productsReducer from "./ProductsReducer";
import messageBoxReducer from "./MessageBoxReducer";
import authReducer from "./AuthReducer";

const rootReducer = combineReducers({
    products: productsReducer,
    messageBox: messageBoxReducer,
    auth: authReducer
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
