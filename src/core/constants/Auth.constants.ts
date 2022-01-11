export const authConstants = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    REGISTER: 'REGISTER',

    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

    AUTH_ERROR: 'AUTH_ERROR',

    UPDATE_USER: 'UPDATE_USER'
};

export type AUTH_LOGIN = typeof authConstants.LOGIN;
export type AUTH_LOGOUT = typeof authConstants.LOGOUT;
export type AUTH_REGISTER = typeof authConstants.REGISTER;
export type AUTH_LOGIN_SUCCESS = typeof authConstants.LOGIN_SUCCESS;
export type AUTH_LOGOUT_SUCCESS = typeof authConstants.LOGOUT_SUCCESS;
export type AUTH_ERROR = typeof authConstants.AUTH_ERROR;
export type AUTH_UPDATE_USER = typeof authConstants.UPDATE_USER;
