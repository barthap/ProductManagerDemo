import {messageBoxConstants} from "../constants/MessageBox.constants";
import {messageBoxActions, MessageBoxShowAction} from "../actions/MessageBox.actions";
import {put, takeEvery} from "redux-saga/effects";
import {delay} from "../../utils/Delay";


//This saga watches for alerts with duration and automatically dismisses them
//when their time comes
export function* messageBoxSaga() {
    yield takeEvery(messageBoxConstants.SHOW, function* (action: MessageBoxShowAction) {
        const { duration } = action.payload;
        if(duration != null && duration > 0) {
            yield delay(duration);
            yield put(messageBoxActions.dismiss());
        }
    });
}
