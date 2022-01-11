import {Reducer} from "redux";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";
import {authConstants} from "../constants/Auth.constants";
import {
    AuthErrorAction,
    LoginAction,
    LoginSuccessAction,
    LogoutAction,
    LogoutSuccessAction,
    RegisterAction
} from "../actions/Auth.actions";

type User = FirebaseAuthTypes.User;

export interface IAuthState {
    isLoading: boolean;
    isLogout: boolean;
    user: User | null;
    isLoggedIn: boolean;
    isError: boolean;
    errorMsg: string;
}

const initialAuthState: IAuthState = {
    isLoading: false,
    isLoggedIn: false,
    isLogout: false,
    user: null,
    isError: false,
    errorMsg: ''
};

type ActionType = LoginAction | LoginSuccessAction | LogoutAction | LogoutSuccessAction | RegisterAction | AuthErrorAction;

const authReducer: Reducer<IAuthState> = (state = initialAuthState, action) => {
    switch (action.type) {
        case authConstants.LOGIN:
        case authConstants.REGISTER:
            return {...state, isLoading: true, isLogout: false, isError: false};
        case authConstants.LOGIN_SUCCESS:
            return {...state, isLoading: false, isLoggedIn: true, user: action.payload.user };
        case authConstants.LOGOUT:
            return {...state, isLogout: true};
        case authConstants.LOGOUT_SUCCESS:
            return {...state, isLoggedIn: false, user: null};
        case authConstants.AUTH_ERROR:
            return {...state, isLoading: false, isError: true, errorMsg: action.payload.message };
        case authConstants.UPDATE_USER:
            return {...state, user: action.payload.user };
        default:
            return state;
    }
};

export default authReducer;
