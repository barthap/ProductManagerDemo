//looks weird
//just to avoid TypeScript errors
//TODO: Find out if there are other ways to do it nice
import {Product} from "../api/ProductApi";

export type NavType = {
    ProductList: 'ProductList';
    Details: 'Details';
    Edit: 'Edit';
    Add: 'Add';
    Login: 'Login';
    Register: 'Register';
}
export const Nav: NavType = {
    ProductList: 'ProductList',
    Details: 'Details',
    Edit: 'Edit',
    Add: 'Add',
    Login: 'Login',
    Register: 'Register'
};

export type RootStackParamList = {
    ProductList: undefined;
    Details: { product: Product };
    Add: undefined;
    Edit: { product: Product };
    Login: undefined;
    Register: undefined;
};
