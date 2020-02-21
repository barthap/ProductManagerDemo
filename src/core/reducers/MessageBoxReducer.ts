import {Reducer} from "redux";
import {messageBoxConstants} from "../constants/MessageBox.constants";
import {AlertStyle} from "../../components/MessageBox";

export interface IMessageBoxState {
    message: string;
    dismissible: boolean;
    visible: boolean;
    alertStyle: AlertStyle;
}

const initialState: IMessageBoxState = {
    alertStyle: 'info',
    dismissible: true,
    message: "[None]",
    visible: false
};

const messageBoxReducer: Reducer<IMessageBoxState> = (state= initialState, action) => {
    switch (action.type) {
        case messageBoxConstants.SHOW:
            return {...state, visible: true, ...action.payload };
        case messageBoxConstants.DISMISS:
            return {...state, visible: false };
        default:
            return state;
    }
};

export default messageBoxReducer;
