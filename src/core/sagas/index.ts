import {all} from "redux-saga/effects";
import {productsSaga} from "./products.saga";
import {messageBoxSaga} from "./MessageBox.saga";

export function* rootSaga() {
    yield all([
        productsSaga(),
        messageBoxSaga()
    ]);
}


