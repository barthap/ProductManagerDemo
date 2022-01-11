import {all} from "redux-saga/effects";
import {productsSaga} from "./Products.saga";
import {messageBoxSaga} from "./MessageBox.saga";
import {authSaga} from "./Auth.saga";

export function* rootSaga() {
    yield all([
        productsSaga(),
        messageBoxSaga(),
        authSaga()
    ]);
}


