import {Action, ActionCreator} from "redux";
import {
    AUTH_ERROR,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_LOGOUT_SUCCESS,
    AUTH_REGISTER, AUTH_UPDATE_USER, authConstants
} from "../constants/Auth.constants";
import {FirebaseAuthTypes} from "@react-native-firebase/auth";

type User = FirebaseAuthTypes.User;

export interface LoginAction extends Action {
    type: AUTH_LOGIN;
    payload: { email: string, password: string }
}
export interface LogoutAction extends Action {
    type: AUTH_LOGOUT;
}
export interface RegisterAction extends Action {
    type: AUTH_REGISTER;
    payload: { email: string, password: string, name: string }
}
export interface LoginSuccessAction extends Action {
    type: AUTH_LOGIN_SUCCESS;
    payload: { user: User }
}
export interface LogoutSuccessAction extends Action {
    type: AUTH_LOGOUT_SUCCESS;
}
export interface AuthErrorAction extends Action {
    type: AUTH_ERROR;
    payload: {message: string};
}
export interface UpdateUserAction extends Action {
    type: AUTH_UPDATE_USER;
    payload: { user: User }
}

const login = (email: string, password: string): LoginAction => ({
    type: authConstants.LOGIN,
    payload: {email, password}
});
const logout: ActionCreator<LogoutAction> = () => ({type: authConstants.LOGOUT});
const register = (name: string, email: string, password: string): RegisterAction => ({
    type: authConstants.REGISTER,
    payload: {email, password, name}
});
const loginSuccess = (user: User): LoginSuccessAction => ({
    type: authConstants.LOGIN_SUCCESS,
    payload: {user}
});
const logoutSuccess: ActionCreator<LogoutSuccessAction> = () => ({type: authConstants.LOGOUT_SUCCESS});

const authError = (message: string): AuthErrorAction => ({
    type: authConstants.AUTH_ERROR,
    payload: {message}
});
const updateUser = (user: User): UpdateUserAction => ({
    type: authConstants.UPDATE_USER,
    payload: {user}
})

export const authActions = {
    login, logout, register, loginSuccess, logoutSuccess, authError, updateUser
};
